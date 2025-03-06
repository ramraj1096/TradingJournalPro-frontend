import { motion } from "framer-motion";
import fb from "../icons/facebook.svg";
import tw from "../icons/icons8-twitter-logo.svg";
import li from "../icons/icons8-linkedin.svg";

function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-500 to-blue-300 bg-blue-500 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-900 py-8"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand Name */}
        <motion.span
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="text-3xl text-white font-bold tracking-tight"
        >
          TradingJournalPro
        </motion.span>

        {/* Navigation Links */}
        <div className="text-white font-bold tracking-tight flex gap-6 flex-wrap justify-center">
          {["Privacy Policy", "Terms of Service", "FAQs", "Contact Us"].map((text, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.1, color: "#D1D5DB" }} // Light gray on hover
              transition={{ duration: 0.3 }}
              className="hover:cursor-pointer"
            >
              {text}
            </motion.span>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 mt-6 md:mt-0">
          {[{ src: fb, label: "Facebook" }, { src: tw, label: "Twitter" }, { src: li, label: "LinkedIn" }].map(
            (icon, index) => (
              <motion.a
                key={index}
                href="#"
                aria-label={icon.label}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <img src={icon.src} alt={icon.label} className="h-6 w-6 hover:opacity-80" />
              </motion.a>
            )
          )}
        </div>
      </div>

      {/* Copyright Text */}
      <div className="text-center mt-8 text-white text-sm">
        © {new Date().getFullYear()} TradingJournalPro. All rights reserved.
      </div>
    </motion.div>
  );
}

export default Footer;
