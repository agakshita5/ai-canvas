// Add an /api/edit/route.ts mirroring /api/chat/route.ts — it takes { imageUrl, instruction, mask? }, runs the edit, 
// uploads the result via your existing uploadGeneratedImage, 
// and saves a new generations row (same session_id so the edit stays in the chat). 
// On the client, the selected-image plumbing already exists.

import { generateText } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/clerk';
import { createGeneration } from '@/lib/db/generations';
import { upsertUserFromClerk } from '@/lib/db/users';
import { uploadGeneratedImage } from '@/lib/db/storage';
import setupGoogleCredentials from '@/lib/google';

setupGoogleCredentials();

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).slice(2);

  try {
    setupGoogleCredentials(); // for vercel deployment

    // validate request
    const { imageUrl, instruction, sessionId } = await req.json();

    // edits within a chat reuse the chat's sessionId
    let resolvedSessionId = sessionId;
    if (!resolvedSessionId?.trim()) {
      console.warn('[chat] missing sessionId from client, generating server-side fallback');
      resolvedSessionId = crypto.randomUUID();
    }

    if (!instruction?.trim()) {
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

    // fetch source bytes
    const buf = Buffer.from(await (await fetch(imageUrl)).arrayBuffer())

    // edit image 
    const result = await generateText({
        model: vertex('gemini-2.5-flash-image'),
        providerOptions: { google: { responseModalities: ['IMAGE'] } },
        messages: [{ 
            role: 'user', 
            content: [
                { type: 'text', text: instruction },
                { type: 'image', image: buf, mediaType: 'image/png' },
            ]
        }],
   });

    if (!result.files) throw new Error('image generation failed');
    
    const file = result.files.find(f => f.mediaType?.startsWith('image/'));
    console.log(`result.files: ${result.files}`);

    // upload generated image to supabase
    const uploadedImage = await uploadGeneratedImage(file.base64, user.id);

    // save new generation in db
    const generation = await createGeneration({
      userId: user.id,
      prompt: instruction,
      imageUrl: uploadedImage.imageUrl,
      sbPublicId: uploadedImage.path,
      aspectRatio: '1:1',
      sessionId: resolvedSessionId,
    });

    return NextResponse.json({
      success: true,
      id: generation.id,
      imageUrl: uploadedImage.imageUrl,
      prompt: instruction,
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
