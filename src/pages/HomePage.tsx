import React from "react";
import { motion } from "framer-motion";
import landingImage from "../assets/landingImg.jpg";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar from "@/components/SearchBar"; // Ensure SearchBar is imported correctly
import { useNavigate } from "react-router-dom";
import GettingStarted from "@/components/GettingStarted";
import { toast } from "sonner";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Handle search submission
  const handleSearchSubmit = (searchFormValues: { searchQuery: string }) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-12"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="md:px-32 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 z-10"
      >
        <h1 className="text-5xl font-bold tracking-tight text-blue-600">
          Track your trades, learn from mistakes, and grow stronger with each step
        </h1>
        <span className="text-xl">Simple searches, smarter decisions. Start here.</span>

        {/* Search Bar with Motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchBar
            placeholder="Search for Equities, Indices, and Crypto with Symbols"
            onSubmit={handleSearchSubmit}
          />
        </motion.div>
      </motion.div>

      {/* Getting Started Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        id="getting-started"
      >
        <GettingStarted />
      </motion.div>

      {/* Mobile App Section */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-4xl font-bold text-blue-600 text-center"
      >
        Stay Ahead with Our Mobile App
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid md:grid-cols-2 gap-5"
      >
        <motion.img
          src={landingImage}
          alt="Trading dashboard"
          className="rounded-lg"
          whileHover={{ scale: 1.03 }}
        />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="font-bold text-3xl tracking-tighter text-blue-600"
          >
            Analyze, adapt, and achieve.
          </motion.span>
          <span>
            Download the TradingJournalPro App for faster and personalized
            recommendations.
          </span>

          <motion.img
            src={appDownloadImage}
            alt="App download"
            className="w-40 hover:cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => toast.info("App is coming soon!")}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
