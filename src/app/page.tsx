'use client';

import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrendingBountiesSection from "@/components/home/TrendingBountiesSection";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
    <Navbar />
    <HeroSection />
    <CategoriesSection />
    <FeaturesSection />
    <TrendingBountiesSection />
    <TestimonialsSection />
    <Footer />
  </div>
  );
}
