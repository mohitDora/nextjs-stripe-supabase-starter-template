// app/buy-button.tsx

import { useFormStatus } from "react-dom"; // For pending state with Server Actions
import { createCheckoutSession } from "@/app/actions/stripe"; // Import your Server Action

interface BuyButtonProps {
  priceId: string;
}

export function BuyButton({ priceId }: BuyButtonProps) {
  const { pending } = useFormStatus(); // Get pending state from the form

  return (
    <form action={createCheckoutSession as (formData: FormData) => void}>
      <input type="hidden" name="priceId" value={priceId} />
      <button
        type="submit"
        disabled={pending}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Processing..." : "Buy Now"}
      </button>
    </form>
  );
}
