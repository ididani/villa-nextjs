// app/api/book/route.js

import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, room, date } = body;

    if (!name || !email || !room || !date) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    // 🟡 TODO: Booking.com API sync goes here later

    // 💳 Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${room} - ${date}`,
            },
            unit_amount: 10000, // $100 in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get("origin")}/booking-success`,
      cancel_url: `${req.headers.get("origin")}/booking-cancel`,
      metadata: { name, email, room, date },
    });

    // 📧 Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Booking Confirmation - The Didani Villa",
      text: `Hi ${name},\n\nYou're booked for the ${room} on ${date}.\n\nSee you soon at The Didani Villa 🌊`,
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
    });
  } catch (err) {
    console.error("🔥 Booking error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
