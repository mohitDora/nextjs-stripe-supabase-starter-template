'use server';

import { createSupabaseServerClient } from "@/config/supabse/supabase-server-client";

export async function sendEmail(email: string) {

    const supabase = await createSupabaseServerClient();

    if (!email.trim()) {
        return;
    }
    console.log(email);
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`,
        },
    });

    if (error) {
        console.error(error);
    }

    if (data) {
        console.log(data);
        return { success: true, email };
    }
}