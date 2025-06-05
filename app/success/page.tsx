"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // For App Router to use searchParams

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-700">Thank you for your purchase.</p>
      {sessionId && (
        <p className="text-sm text-gray-500 mt-2">Session ID: {sessionId}</p>
      )}
      <a
        href="/"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Go to Home
      </a>
    </div>
  );
}

export default function SuccessPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
