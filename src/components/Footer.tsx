import fb from "../icons/facebook.svg";
import tw from "../icons/icons8-twitter-logo.svg";
import li from "../icons/icons8-linkedin.svg";
function Footer() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-300 bg-blue-500 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-900 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
 
        <span className="text-3xl text-white font-bold tracking-tight">
          TradingJournalPro
        </span>


        <div className="text-white font-bold tracking-tight flex gap-6 flex-wrap justify-center">
          <span className="hover:cursor-pointer hover:text-gray-300">
            Privacy Policy
          </span>
          <span className="hover:cursor-pointer hover:text-gray-300">
            Terms of Service
          </span>
          <span className="hover:cursor-pointer hover:text-gray-300">
            FAQs
          </span>
          <span className="hover:cursor-pointer hover:text-gray-300">
            Contact Us
          </span>
        </div>


        <div className="flex gap-4 mt-6 md:mt-0">
          <a href="#" aria-label="Facebook">
            <img
              src={fb}
              alt="Facebook"
              className="h-6 w-6 hover:opacity-80"
            />
          </a>
          <a href="#" aria-label="Twitter">
            <img
              src={tw}
              alt="Twitter"
              className="h-6 w-6 hover:opacity-80"
            />
          </a>
          <a href="#" aria-label="LinkedIn">
            <img
              src={li}
              alt="LinkedIn"
              className="h-6 w-6 hover:opacity-80"
            />
          </a>
        </div>
      </div>


      <div className="text-center mt-8 text-white text-sm">
        © {new Date().getFullYear()} TradingJournalPro. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
