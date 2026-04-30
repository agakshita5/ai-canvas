import { ImageModel, streamText, UIMessage, convertToModelMessages, generateImage } from 'ai';
import { replicate } from '@ai-sdk/replicate';
import { writeFile } from 'node:fs/promises';

const defaultModel = "black-forest-labs/flux-schnell";
const defaultSize = "1024x1024"
const defaultAspectRatio = "1:1"

interface ProviderConfig {
  createImageModel: (modelId: string) => ImageModel;
  dimensionFormat: "size" | "aspectRatio";
}

const providerConfig = {
  replicate: {
    createImageModel: replicate.image,
    dimensionFormat: "size",
  }
};
// black-forest-labs/flux-schnell
// recraft-ai/recraft-v3
export async function POST(req: Request) {
  const { message } = await req.json();

  const last = message[0];
  const role = last.role;
  const content = last.content;
  const model = last.model == "flux-schnell" ? 'black-forest-labs/flux-schnell' : 'recraft-ai/recraft-v3';
  const size = last.size;
  console.log('Received: ', {content, model, size});

  // generate image
  // const { image } = await generateImage({
  //   model: replicate.image(model),
  //   prompt: content,
  //   aspectRatio: size,
  // });
  // await writeFile('output_image/image.webp', image.uint8Array);

  // return url of image
  return Response.json({
    reply: `image_url: "output_image/image.webp"`
  });

}
