import React, { useEffect, useRef, memo, useState } from "react";

type Props = {
  symbol: string;
};

const TradinviewProfileAndTechnicals: React.FC<Props> = ({ symbol }) => {
  const containerRef1 = useRef<HTMLDivElement>(null); // For Symbol Profile
  const containerRef2 = useRef<HTMLDivElement>(null); // For Technical Analysis
  const [mode, setMode] = useState<string>("light"); // Default to light theme

  // Fetch the theme from localStorage when component mounts
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setMode(storedTheme);
    }
  }, []);

  // Cleanup function to prevent widget duplication
  useEffect(() => {
    return () => {
      if (containerRef1.current) {
        containerRef1.current.innerHTML = "";
      }
      if (containerRef2.current) {
        containerRef2.current.innerHTML = "";
      }
    };
  }, []);

  // Update widgets when the symbol or theme changes
  useEffect(() => {
    if (containerRef1.current) {
      containerRef1.current.innerHTML = ""; // Clear any previous widget

      const script1 = document.createElement("script");
      script1.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js";
      script1.type = "text/javascript";
      script1.async = true;

      // Widget Configuration for Symbol Profile
      script1.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        isTransparent: false,
        colorTheme: mode, // Use dynamic theme
        symbol: symbol,
        locale: "en",
      });

      containerRef1.current.appendChild(script1);
    }

    if (containerRef2.current) {
      containerRef2.current.innerHTML = ""; // Clear any previous widget

      const script2 = document.createElement("script");
      script2.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
      script2.type = "text/javascript";
      script2.async = true;

      // Widget Configuration for Technical Analysis
      script2.innerHTML = JSON.stringify({
        interval: "1m",
        width: "100%",
        height: "100%",
        isTransparent: false,
        symbol: symbol,
        showIntervalTabs: true,
        displayMode: "single",
        locale: "en",
        colorTheme: mode, // Use dynamic theme
      });

      containerRef2.current.appendChild(script2);
    }
  }, [symbol, mode]); // Re-run effect when symbol or mode changes

  return (
    <div className="flex flex-wrap items-start justify-center w-full p-4 dark:bg-gradient-to-br dark:bg-gray-900 bg-gradient-to-br bg-gray-100 rounded-lg shadow-lg space-y-8 md:space-y-0">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 w-full text-center">
        {symbol} Analysis & Profile
      </h2>

      {/* Flex container to hold both widgets side by side */}
      <div className="flex flex-wrap justify-between w-full gap-8">
        {/* Symbol Profile Widget (Left side) */}
        <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[48%] h-[350px] rounded-md overflow-hidden border border-gray-300 shadow-md">
          <div
            className="tradingview-widget-container w-full h-full"
            ref={containerRef1}
          >
            <div className="tradingview-widget-container__widget"></div>
          </div>
        </div>

        {/* Technical Analysis Widget (Right side) */}
        <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[48%] h-[350px] rounded-md overflow-hidden border border-gray-300 shadow-md">
          <div
            className="tradingview-widget-container w-full h-full"
            ref={containerRef2}
          >
            <div className="tradingview-widget-container__widget"></div>
          </div>
        </div>
      </div>

      {/* Optional Copyright or Footer Link */}
      <div className="text-sm text-blue-500 mt-2">
        {/* <a href="https://www.tradingview.com/" target="_blank" rel="noopener noreferrer">Track all markets on TradingView</a> */}
      </div>
    </div>
  );
};

export default memo(TradinviewProfileAndTechnicals);
