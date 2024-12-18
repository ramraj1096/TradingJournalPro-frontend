import React, { useEffect, useRef, memo, useState } from 'react';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement | null>(null); // Type the ref correctly
  const [theme, setTheme] = useState("dark"); // Dynamic theme state

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;

    // Set widget configuration
    script.innerHTML = JSON.stringify({
      "symbols": [
        ["Apple", "AAPL|1D"],
        ["Google", "GOOGL|1D"],
        ["Microsoft", "MSFT|1D"]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": theme, // Dynamically set the theme
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "maLineColor": "#2962FF",
      "maLineWidth": 1,
      "maLength": 9,
      "headerFontSize": "medium",
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ]
    });

    // Append the script to the container
    if (container.current) {
      container.current.appendChild(script);
    }

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (container.current) {
        container.current.innerHTML = ""; // Clear previous widget
      }
    };
  }, [theme]); // Re-run effect whenever theme changes

  return (
    <div className="tradingview-widget-container" ref={container}>
      {/* Widget will be injected by the script */}
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
