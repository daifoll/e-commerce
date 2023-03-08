const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: JSON.parse(req.body.products),
                mode: 'payment',
                customer_email: req.body.email,
                success_url: `${req.headers.origin}/success?success=true`,
                cancel_url: `${req.headers.origin}/success?canceled=true`,
            });
            res.redirect(303, session.url);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}