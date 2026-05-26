import { generateImage } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';
import { NextResponse } from "next/server";

const defaultAspectRatio = "1:1"

// A photorealistic image of a cat wearing a wizard hat
export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(7);
  const {prompt, size} = await req.json();
  // validating prompt nad size
  if (!prompt || !size) {
    const error = "Invalid request parameters";
    console.error(`${error} [requestId=${requestId}]`);
    return NextResponse.json({ error }, { status: 400 });
  }
  console.log('Received: ', {prompt, size});

  try {
    // generate image
    const { image } = await generateImage({
      model: vertex.image('imagen-3.0-generate-001'),
      prompt,
      aspectRatio: size || defaultAspectRatio,
    });

    // return url of image
    return NextResponse.json({
      success: true,
      imageBase64: image.base64,
      prompt,
    });

  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
