import React from "react";
import landingImage from "../assets/landingImg.jpg";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar from "@/components/SearchBar"; // Ensure SearchBar is imported correctly
import { useNavigate } from "react-router-dom";
import GettingStarted from "@/components/GettingStarted";
import { toast } from "sonner";


const HomePage: React.FC = () => {

  // localStorage.clear();
  const navigate = useNavigate();

  console.log(import.meta.env.API_BASE_URL);

  // Handle search submission
  const handleSearchSubmit = (searchFormValues: { searchQuery: string }) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <div className="md:px-32 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 z-10">
        <h1 className="text-5xl font-bold tracking-tight text-blue-600">
          Track your trades, learn from mistakes, and grow stronger with each step
        </h1>
        <span className="text-xl">Simple searches, smarter decisions. Start here.</span>
        <SearchBar
          placeholder="Search for Equities, Indices, and Crypto with Symbols"
          onSubmit={handleSearchSubmit}
        />
      </div>

      {/* Getting Started Section */}
      <div id="getting-started">
        <GettingStarted />
      </div>

      {/* TradingView Widget */}
      <div className="hidden md:block">
        {/* <TradingviewSymbolOverviewWidget /> */}
      </div>

      {/* Mobile App Section */}
      <h2 className="text-4xl font-bold text-blue-600 text-center">
        Stay Ahead with Our Mobile App
      </h2>
      <div className="grid md:grid-cols-2 gap-5">
        <img
          src={landingImage}
          alt="Trading dashboard"
          className="rounded-lg"
        />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter text-blue-600">
            Analyze, adapt, and achieve.
          </span>
          <span>
            Download the TradingJournalPro App for faster and personalized
            recommendations.
          </span>
          <img
            src={appDownloadImage}
            alt="App download"
            className="w-40 hover:cursor-pointer"
            onClick={() => toast.info("app is comingsoon !")}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
