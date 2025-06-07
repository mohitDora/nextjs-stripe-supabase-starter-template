import Stripe from 'stripe';

export const stripeAdmin = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    appInfo: {
        name: 'UPDATE_THIS_WITH_YOUR_STRIPE_APP_NAME',
        version: '0.1.0',
    },
});