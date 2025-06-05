"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/config/supabse/client';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleAuthCallback() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error.message);
        router.replace('/login');
        return;
      }

      if (data.session) {
        router.replace('/dashboard');
      } else {
        console.error('No session found.');
        router.replace('/login');
      }
    }

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-md">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-lg text-gray-700">Verifying your email...</p>
        <p className="text-sm text-gray-500 text-center">
          Please wait, you will be redirected shortly.
        </p>
      </div>
    </div>
  );
}
