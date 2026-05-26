import { embed } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';

export async function generatePromptEmbedding(prompt: string): Promise<number[]> {
  const { embedding } = await embed({
    model: vertex.embeddingModel('text-embedding-005'),
    value: prompt.trim(),
  });

  return embedding;
}
