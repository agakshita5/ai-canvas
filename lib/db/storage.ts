import { createSupabaseServerClient } from '@/lib/supabase/server';
import { decode } from 'base64-arraybuffer';

export async function uploadGeneratedImage(imageBase64: string, userId: string) {
    const supabase = createSupabaseServerClient();
    // sb accepts buffer/blob/file, not data url string
    const { data: uploadedData, error: uploadError } = await supabase.storage
    .from('generated-images')
    .upload(`${userId}/${crypto.randomUUID()}.png`, decode(imageBase64), {
        contentType: 'image/png'
    });

    if (uploadError) throw new Error(uploadError.message);

    // since private bucket - use time-limited URL using createSignedUrl (for 30 days)
    const { data: signedData, error: signedError } = await supabase.storage
    .from('generated-images')
    .createSignedUrl(uploadedData.path, 60 * 60 * 24 * 30);

    if (signedError) throw new Error(signedError.message);

    return {
        imageUrl: signedData.signedUrl,
        path: uploadedData.path,
        id: uploadedData.id
    };
}
