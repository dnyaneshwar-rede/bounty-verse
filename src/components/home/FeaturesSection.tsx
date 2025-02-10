'use client';
import { motion } from "framer-motion";
import { Globe, Code, Rocket, Shield } from "lucide-react";

const features = [
  {
    icon: <Globe className="w-8 h-8 text-purple-500" />,
    title: "Global Marketplace",
    description: "Work with developers worldwide on exciting projects"
  },
  {
    icon: <Code className="w-8 h-8 text-blue-500" />,
    title: "Find Bounties",
    description: "Access exclusive tasks from top companies"
  },
  {
    icon: <Rocket className="w-8 h-8 text-yellow-500" />,
    title: "Earn & Grow",
    description: "Get instant payouts and level up your skills"
  },
  {
    icon: <Shield className="w-8 h-8 text-green-500" />,
    title: "Trust & Transparency",
    description: "Secure transactions and verified projects"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-purple-500 font-semibold">✨ Why Choose Bountyverse?</span>
        <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Level Up Your Career</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Our platform offers unique opportunities to grow, earn, and connect with
          the global developer community
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800/50 hover:border-purple-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-xl inline-block mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
