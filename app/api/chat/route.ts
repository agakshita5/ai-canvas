import { generateImage } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/clerk';
import { createGeneration } from '@/lib/db/generations';
import { upsertUserFromClerk } from '@/lib/db/users';
import { uploadGeneratedImage } from '@/lib/db/storage';
import setupGoogleCredentials from '@/lib/google';

const defaultAspectRatio = '1:1';

setupGoogleCredentials();

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).slice(2);

  try {
    setupGoogleCredentials(); // for vercel deployment

    // validate request
    const {prompt, size, sessionId} = await req.json();

    // edits within a chat reuse the chat's sessionId
    let resolvedSessionId = sessionId;
    if (!resolvedSessionId?.trim()) {
      console.warn('[chat] missing sessionId from client, generating server-side fallback');
      resolvedSessionId = crypto.randomUUID();
    }

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

    // upload generated image to supabase
    const uploadedImage = await uploadGeneratedImage(image.base64, user.id);

    // save new generation in db
    const generation = await createGeneration({
      userId: user.id,
      prompt,
      imageUrl: uploadedImage.imageUrl,
      sbPublicId: uploadedImage.path,
      aspectRatio: size || defaultAspectRatio,
      sessionId: resolvedSessionId,
    });

    return NextResponse.json({
      success: true,
      id: generation.id,
      imageUrl: uploadedImage.imageUrl,
      prompt,
      aspectRatio: generation.aspect_ratio,
    });
  } catch (error) {
    console.error(`image generation error [requestId=${requestId}]`, error);
  
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 }
    );
  }
}
