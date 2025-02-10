'use client';
import { motion } from "framer-motion";
import { Brain, Code, Target, Sparkles } from "lucide-react";

const categories = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI & ML",
    count: "200+ Bounties"
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Web3 Dev",
    count: "150+ Bounties"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Bug Bounties",
    count: "300+ Bounties"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Content",
    count: "100+ Bounties"
  }
];

const CategoriesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-purple-500 font-semibold">🎯 Explore Categories</span>
        <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Find Your Perfect Bounty</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover opportunities across multiple domains and start earning today
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800/50 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              {category.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            <p className="text-purple-400 text-sm">{category.count}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
