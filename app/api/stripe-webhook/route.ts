// app/api/stripe-webhook/route.ts
import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    console.error(`Webhook Error: ${err}`);
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Checkout Session Completed:", session.id);
      // Fulfill the purchase here (e.g., update user's subscription, send confirmation email)
      // You would typically use Prisma here to update your database:
      // await prisma.order.update({
      //   where: { stripeSessionId: session.id },
      //   data: { status: 'completed', paymentIntentId: session.payment_intent as string },
      // });
      break;
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
