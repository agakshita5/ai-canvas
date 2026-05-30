import { auth } from "@clerk/nextjs/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(){
    const {userId} = await auth();
    if(!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
    .from('generations')
    .select('id, prompt, image_url, aspect_ratio, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }

    return NextResponse.json({ success: true, generations: data });
}
