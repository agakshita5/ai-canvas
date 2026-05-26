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
  threshold?: number,
  count?: number,
): Promise<SimilarGenerationMatch | null>;

export async function createGeneration(
  input: CreateGenerationInput,
): Promise<GenerationRecord>;

export async function getGenerationsForUser(
  userId: string,
  limit?: number,
): Promise<GenerationRecord[]>;