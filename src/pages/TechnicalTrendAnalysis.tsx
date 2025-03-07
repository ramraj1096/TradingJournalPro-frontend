import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

type TrendType = "Bullish" | "Bearish" | "Neutral";

const API_URI= import.meta.env.VITE_API_BASE_URL_MLMODELS as string;

interface TechnicalAnalysis {
  stock: string;
  prediction: {
    trend: TrendType;
    reasons: string[];
  };
}

const TechnicalTrendAnalysis = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [data, setData] = useState<TechnicalAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTechnicalAnalysis = async () => {
    if (!stockSymbol) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(
        `${API_URI}/technical/${stockSymbol.trim().replace(/\s+/g, "") + ".NS"}`
      );
      const result = await response.json();

      if (result.detail === "Stock data not found") {
        toast.error("No stock data found")
        setError("Stock data not found. Please enter a valid stock symbol.");
      } else {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching technical analysis:", error);
      setError("Something went wrong. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-8 py-6 text-gray-900 dark:text-gray-50 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">📊 Technical Trend Analysis</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-200 w-full">
          <Input
            className="w-full bg-white text-gray-900 dark:text-gray-50 dark:bg-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 px-4 py-2 rounded-md text-lg"
            placeholder="Enter stock symbol (e.g., GSPL.NS)"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
          />
          <Button
            onClick={fetchTechnicalAnalysis}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 px-5 py-2 text-lg rounded-md text-white flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : "Analyze"}
          </Button>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-lg shadow-md text-lg font-medium"
        >
          ❌ {error}
        </motion.div>
      )}

      {/* Display Analysis Data */}
      {data && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-8 w-full max-w-3xl"
        >
          <h2 className="text-lg sm:text-xl font-medium mb-4">
            Analysis for: <span className="text-blue-600 font-semibold">{stockSymbol}</span>
          </h2>

          <motion.div
            className="text-md sm:text-lg font-semibold mb-6 flex justify-center items-center gap-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {data.prediction.trend === "Bullish"
              ? "📈 Bullish Trend"
              : data.prediction.trend === "Bearish"
              ? "📉 Bearish Trend"
              : "⚖️ Neutral Trend"}
          </motion.div>

          <Card className="bg-white dark:bg-gray-900 border border-gray-300 rounded-md shadow-sm p-4">
            <CardContent>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-50 mb-2">📌 Reasons for Trend</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-50 text-md">
                {data.prediction.reasons.map((reason, index) => (
                  <li key={index} className="mt-2">✅ {reason}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default TechnicalTrendAnalysis;
