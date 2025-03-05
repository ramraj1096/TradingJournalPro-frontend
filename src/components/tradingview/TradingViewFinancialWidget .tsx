import React, { useEffect, useRef, memo, useState } from "react";

interface TradingViewFinancialWidgetProps {
  assetName: string; // Asset name only, e.g., "TATAMOTORS"
}

const TradingViewFinancialWidget: React.FC<TradingViewFinancialWidgetProps> = ({ assetName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<string>('light');

  useEffect(() => {
    // Retrieve theme from localStorage on initial load
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setMode(storedTheme);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    if (containerRef.current) {
      // Clear any existing widget scripts to prevent duplication
      containerRef.current.innerHTML = "";

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
      script.type = "text/javascript";
      script.async = true;

      // Construct the full symbol using "NSE" market prefix and assetName
      const symbol = `NSE:${assetName}`;

      // Configuration for the widget with dynamic theme
      script.innerHTML = JSON.stringify({
        isTransparent: false,
        largeChartUrl: "",
        displayMode: "regular",
        width: "100%",
        height: "100%",
        colorTheme: mode, // Use the dynamic mode (light or dark)
        symbol,
        locale: "en",
      });

      containerRef.current.appendChild(script);
    }
  }, [assetName, mode]); // Depend on both assetName and mode for updates

  return (
    <div className="flex flex-col items-center w-full h-screen dark:bg-gradient-to-br dark:bg-gray-900 bg-gradient-to-br bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 mt-6">
        {assetName} Financials
      </h2>
      <div
        className="tradingview-widget-container flex-grow w-full h-full rounded-md overflow-hidden border dark:bg-gray-800 border-gray-300 shadow-md"
        ref={containerRef}
      >
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default memo(TradingViewFinancialWidget);
