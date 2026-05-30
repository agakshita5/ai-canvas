import { generateImage } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/clerk';
import { createGeneration } from '@/lib/db/generations';
import { upsertUserFromClerk } from '@/lib/db/users';
import { uploadGeneratedImage } from '@/lib/cloudinary';
import fs from 'fs';

const defaultAspectRatio = '1:1';

function setupGoogleCredentials() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) return;
  if (!process.env.GOOGLE_CREDENTIALS_JSON) throw new Error('Missing Google credentials');
  
  const credentialsPath = '/tmp/google-credentials.json';
  fs.writeFileSync(credentialsPath, process.env.GOOGLE_CREDENTIALS_JSON);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
}

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).slice(2);

  try {
    setupGoogleCredentials(); // for vercel deployment

    // validate request
    const {prompt, size} = await req.json();

    if (!prompt?.trim() || !size?.trim()) {
      return NextResponse.json(
        { success: false, error: 'invalid request parameters' },
        { status: 400 },
      );
    }

    // get signed in user and save it in db
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'unauthorized' },
        { status: 401 }
      );
    }
    await upsertUserFromClerk(user);

    // generate image 
    const { image } = await generateImage({
      model: vertex.image('imagen-3.0-generate-001'),
      prompt,
      aspectRatio: size || defaultAspectRatio,
    });

    if (!image.base64) throw new Error('image generation failed');

    // TODO shift storage to sb
    // upload generated image to cloudinary
    const uploadedImage = await uploadGeneratedImage(image.base64);

    // save new generation in db
    await createGeneration({
      userId: user.id,
      prompt,
      imageUrl: uploadedImage.imageUrl,
      aspectRatio: size || defaultAspectRatio,
    });

    return NextResponse.json({
      success: true,
      imageUrl: uploadedImage.imageUrl,
      source: 'generated',
      prompt,
    });
  } catch (error) {
    console.error(`image generation error [requestId=${requestId}]`, error);
  
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 }
    );
  }
}
