import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SuggestionsGrid from '../components/SuggestionsGrid';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <SuggestionsGrid />
      <Footer />
    </main>
  );
} 