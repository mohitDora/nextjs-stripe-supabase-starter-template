'use server';

import { createSupabaseServerClient } from "@/config/supabse/supabase-server-client";
import { useRouter } from 'next/navigation';

export const sendEmail = async (email: string) => {

    const supabase = await createSupabaseServerClient();
    const router = useRouter();

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
        router.push(`/verify?email=${encodeURIComponent(email)}`);
    }
};