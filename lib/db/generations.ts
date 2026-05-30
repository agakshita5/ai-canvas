import { createSupabaseServerClient } from '@/lib/supabase/server';

export type GenerationRecord = { // to return in this shape
  id: string;
  user_id: string;
  prompt: string;
  image_url: string;
  sb_public_id: string;
  aspect_ratio: string | null;
  created_at: string;
};

export type CreateGenerationInput = { // to give it as a input for record creation
  userId: string;
  prompt: string;
  imageUrl: string;
  sbPublicId: string;
  aspectRatio: string | null;
};

export async function createGeneration(input: CreateGenerationInput): Promise<GenerationRecord> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('generations')
    .insert({
      user_id: input.userId,
      prompt: input.prompt,
      image_url: input.imageUrl,
      sb_public_id: input.sbPublicId,
      aspect_ratio: input.aspectRatio,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
