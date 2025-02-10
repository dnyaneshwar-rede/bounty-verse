'use client';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Full Stack Developer",
    content: "Bountyverse helped me earn while learning. The platform is incredible!",
    image: "AC"
  },
  {
    name: "Sarah Miller",
    role: "Smart Contract Developer",
    content: "Found amazing opportunities in Web3 development. Great community!",
    image: "SM"
  },
  {
    name: "James Wilson",
    role: "AI Engineer",
    content: "The quality of bounties and the payment process are top-notch.",
    image: "JW"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-gradient-to-b from-purple-900/20 to-gray-900/20">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-purple-500 font-semibold">⭐ Success Stories</span>
        <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">What Our Users Say</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Hear from developers who have found success through Bountyverse
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 text-4xl">❝</div>
            <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-800/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">
                    {testimonial.image}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription className="text-gray-400">{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mt-4">{testimonial.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
