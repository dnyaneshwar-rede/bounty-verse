
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrendingBountiesSection from "@/components/home/TrendingBountiesSection";
import Navbar from "@/components/Navbar";

const Page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <Navbar />
    
    

       {/* Page Content */}
    <main className="space-y-20 pb-20">
      <HeroSection />
      <CategoriesSection />
      <FeaturesSection />
      <TrendingBountiesSection />
      <TestimonialsSection />
    </main>

    <Footer />
    </div>
  );
};

export default Page;
