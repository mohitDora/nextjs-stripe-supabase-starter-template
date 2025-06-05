"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(formData: FormData) {
  const priceId = formData.get("priceId") as string; // Get price ID from form data

  if (!priceId) {
    console.error("Price ID is missing.");
    return { error: "Price ID is required." };
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/cancel`,
    });

    if (session.url) {
      redirect(session.url);
    } else {
      return { error: "Failed to create Stripe Checkout session URL." };
    }
  } catch (error: unknown) {
    console.error("Error creating checkout session:", error);
    return { error: error || "Failed to create checkout session." };
  }
}
