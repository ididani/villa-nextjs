"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { loadStripe } from "@stripe/stripe-js";
import "./globals.css";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import RoomsSection from "./components/RoomsSection";
import MapSection from "./components/MapSection";
import BookingSection from "./components/BookingSection";
import Footer from "./components/Footer";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Home() {
  return (
    <main className="pt-16 flex flex-col items-center">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <RoomsSection />
      <MapSection />
      <BookingSection />
      <Footer />
    </main>
  );
}
