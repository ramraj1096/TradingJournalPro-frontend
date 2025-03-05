import TradingViewFinancialWidget from "@/components/tradingview/TradingViewFinancialWidget ";
import TradinviewProfileAndTechnicals from "@/components/tradingview/TradinviewProfileAndTechnicals";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";


const AssetSearchPage = () => {
    const { symbol } = useParams<{ symbol: string }>();

  if (!symbol) {
    return <div>Symbol not found</div>;
  }
  const handleRedirectToCharts = () => {
    const url = `https://in.tradingview.com/chart/s8olBxqN/?symbol=NSE%3A${symbol}`;
    window.open(url, "_blank"); // Open the chart in a new tab
  };
  return (
    <div>
        <div className="dark:bg-gray-900">
            <TradinviewProfileAndTechnicals symbol={symbol} />
        </div>
        <div>
            <TradingViewFinancialWidget assetName={symbol}/>
            <Button
          onClick={handleRedirectToCharts}
          className="bg-blue-500 flex float-start"
        >
          Go to charts
        </Button>
        </div>
    </div>
  )
}

export default AssetSearchPage