import { motion } from "framer-motion";
import heroImage from "../assets/heroImg.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Hero = () => {
  return (
    <Card className="relative dark:bg-gradient-to-r dark:from-gray-950 dark:to-gray-950 bg-gradient-to-r from-blue-500 to-blue-300 h-auto min-h-[75vh] py-12 overflow-hidden rounded-none">
      <div className="absolute inset-0 "></div>
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-center h-full relative z-10 gap-10">
        
        {/* Text Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-extrabold dark:text-slate-500 text-white leading-snug mb-6">
              Elevate Your Trading Journey with{" "}
              <span className="dark:text-yellow-600 text-yellow-300">
                Trading Journal Pro
              </span>
            </CardTitle>
            <CardContent>
              <p className="dark:text-slate-400 text-white text-lg mb-8">
                Discover insights, track your performance, and refine your
                strategies with our advanced journaling platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-300 dark:bg-yellow-600 text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition"
                  onClick={() => (window.location.href = "#getting-started")}
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-blue-600 text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg"
                  onClick={() => (window.location.href = "#getting-started")}
                >
                  Learn More
                </motion.button>
              </div>
            </CardContent>
          </CardHeader>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="lg:w-1/2 flex justify-center"
        >
          <img
            src={heroImage}
            alt="Trading illustration"
            className="dark:opacity-75 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto rounded-lg shadow-lg object-cover"
          />
        </motion.div>
      </div>
    </Card>
  );
};

export default Hero;
