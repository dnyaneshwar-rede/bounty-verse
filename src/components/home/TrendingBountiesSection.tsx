'use client';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Clock } from "lucide-react";

const trendingBounties = [
  {
    title: "AI Model Optimization",
    company: "TechCorp",
    reward: "$5,000",
    deadline: "7 days left",
    logo: "TC"
  },
  {
    title: "Smart Contract Audit",
    company: "DeFi Protocol",
    reward: "$3,000",
    deadline: "5 days left",
    logo: "DP"
  },
  {
    title: "UI/UX Redesign",
    company: "StartupX",
    reward: "$2,500",
    deadline: "3 days left",
    logo: "SX"
  }
];

const TrendingBountiesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-purple-500 font-semibold">🔥 Hot Opportunities</span>
        <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Trending Bounties</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Check out the most popular bounties currently available on our platform
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingBounties.map((bounty, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-800/50 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">
                      {bounty.logo}
                    </div>
                    <div className="text-left">
                      <CardTitle className="text-lg">{bounty.title}</CardTitle>
                      <CardDescription className="text-gray-400">{bounty.company}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-500 font-semibold">{bounty.reward}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">{bounty.deadline}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingBountiesSection;
