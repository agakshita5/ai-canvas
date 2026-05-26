import { createSupabaseServerClient } from '@/lib/supabase/server';

export type GenerationRecord = { // to return in this shape
  id: string;
  user_id: string;
  prompt: string;
  prompt_embedding: number[] | null;
  image_url: string;
  cloudinary_public_id: string | null;
  aspect_ratio: string | null;
  created_at: string;
};

export type SimilarGenerationMatch = { // to return in this shape along with similarity score
  id: string;
  user_id: string;
  prompt: string;
  image_url: string;
  cloudinary_public_id: string | null;
  aspect_ratio: string | null;
  similarity: number;
  created_at: string;
};

export type CreateGenerationInput = { // to give it as a input for record creation
  userId: string;
  prompt: string;
  promptEmbedding: number[];
  imageUrl: string;
  cloudinaryPublicId: string | null;
  aspectRatio: string | null;
};

export async function findSimilarGeneration(
  queryEmbedding: number[],
  threshold = 0.9,
  count = 1,
): Promise<SimilarGenerationMatch | null> {
  
  const supabase = createSupabaseServerClient();
  // rpc: remote procedure call 
  // to call a sql function in supabase from the backend
  const { data, error } = await supabase.rpc('match_similar_generations', {
    query_embedding: queryEmbedding,
    match_threshold: threshold,
    match_count: count,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data[0] ?? null;
}

export async function createGeneration(
  input: CreateGenerationInput,
): Promise<GenerationRecord> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('generations')
    .insert({
      user_id: input.userId,
      prompt: input.prompt,
      prompt_embedding: input.promptEmbedding,
      image_url: input.imageUrl,
      cloudinary_public_id: input.cloudinaryPublicId,
      aspect_ratio: input.aspectRatio,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
