import { generateImage } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/clerk';
import { createGeneration, findSimilarGeneration } from '@/lib/db/generations';
import { upsertUserFromClerk } from '@/lib/db/users';
import { generatePromptEmbedding } from '@/lib/embeddings';
import { uploadGeneratedImage } from '@/lib/cloudinary';

const defaultAspectRatio = '1:1';

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).slice(2);

  try {
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

    // generate embedding for current prompt
    const promptEmbedding = await generatePromptEmbedding(prompt);

    // check for old similar prompts in db
    const matchedGeneration = await findSimilarGeneration(promptEmbedding, 0.9, 1);

    if (matchedGeneration) { // match found
      // save cache history - per user history
        await createGeneration({
        userId: user.id,
        prompt,
        promptEmbedding,
        imageUrl: matchedGeneration.image_url,
        cloudinaryPublicId: matchedGeneration.cloudinary_public_id,
        aspectRatio: size || defaultAspectRatio,
      });

      return NextResponse.json({
        success: true,
        imageUrl: matchedGeneration.image_url,
        source: 'cache',
        prompt,
      });
    }

    // generate image if no match found
    const { image } = await generateImage({
      model: vertex.image('imagen-3.0-generate-001'),
      prompt,
      aspectRatio: size || defaultAspectRatio,
    });

    if (!image.base64) throw new Error('image generation failed');

    // upload generated image to cloudinary
    const uploadedImage = await uploadGeneratedImage(image.base64);

    // save new generation in db
    await createGeneration({
      userId: user.id,
      prompt,
      promptEmbedding,
      imageUrl: uploadedImage.imageUrl,
      cloudinaryPublicId: uploadedImage.publicId,
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
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
