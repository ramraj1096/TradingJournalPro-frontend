import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { chartAnalyticsDataofTrades } from "@/api/trades-api";

interface Holding {
  image?: string;
  assetName: string;
  totalTradedValue: number;
  PL: number;
}

const AnalyticsAssetDetailsOfTrades = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Holding[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await chartAnalyticsDataofTrades(navigate);

        if (response.success) {
          if (response.trades.length === 0) {
            toast.info("No active holdings!");
          } else {
            setData(response.trades);
          }
        } else {
          toast.error(response.message || "Failed to fetch trades.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching trades.");
      }
    };

    fetchChartData();
  }, [navigate]);

  return (
    <div className="p-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((holding, index) => (
        <Card
          key={index}
          className="p-4 shadow-lg border rounded-lg hover:shadow-xl transition-shadow duration-200"
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={holding.image || ""} alt={holding.assetName} />
              <AvatarFallback className="bg-gray-500 text-white">
                {holding.assetName ? holding.assetName[0] : "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-300">
                {holding.assetName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-300">Asset Details</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium dark:text-slate-300">Total Traded Value:</span> 
              <span className="ml-2 text-gray-800">
                {holding.totalTradedValue.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              <span className="font-medium dark:text-slate-300">Profit/Loss:</span>
              <span
                className={`ml-2 font-medium ${holding.PL >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {holding.PL.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsAssetDetailsOfTrades;