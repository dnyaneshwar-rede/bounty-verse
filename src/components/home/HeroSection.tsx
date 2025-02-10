'use client';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Code, Laptop, Cpu } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const floatingIcons = [
  { icon: <Code className="w-6 h-6 text-purple-400" />, x: -20, y: -15 },
  { icon: <Laptop className="w-6 h-6 text-pink-400" />, x: 25, y: 10 },
  { icon: <Cpu className="w-6 h-6 text-orange-400" />, x: -15, y: 20 }
];

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Success!",
      description: "You've been added to our waitlist. We'll notify you when we launch!",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.01)_0%,rgba(255,255,255,0.02)_100%)] pointer-events-none"></div>
      
      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: item.x,
            y: item.y,
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            left: `${50 + (index * 15)}%`,
            top: `${30 + (index * 10)}%`,
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* 3D Card Effect */}
      <motion.div 
        className="absolute top-20 right-10 hidden lg:block"
        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="w-64 h-80 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-gray-700/50 p-6 transform rotate-6 perspective-1000">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <div className="h-4 w-3/4 rounded bg-gray-700/50"></div>
            <div className="h-4 w-1/2 rounded bg-gray-700/50"></div>
            <div className="h-20 w-full rounded-lg bg-gray-700/30 mt-4"></div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="text-center space-y-8 relative z-10"
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 }
        }}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[120px] -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
        />
        
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Earn Rewards.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
            Build. Conquer.
          </span>
        </motion.h1>
        
        <motion.p 
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join the ultimate bounty marketplace for developers, students, and hustlers.
          Level up your skills while earning rewards. 🚀
        </motion.p>
        
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 px-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
            />
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white px-8 py-6 rounded-full transform transition-transform duration-200 hover:scale-105"
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
