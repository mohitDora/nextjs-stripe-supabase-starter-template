import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-lg text-gray-700">Your payment was not completed.</p>
      <Link href="/dashboard" className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Go to Home
      </Link>
    </div>
  );
}
