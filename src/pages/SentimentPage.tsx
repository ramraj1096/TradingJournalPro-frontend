import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

type SentimentType = "Positive" | "Neutral" | "Negative";

interface SentimentAnalysisItem {
  headline: string;
  link: string;
  sentiment: SentimentType;
  scores: { Positive: number; Neutral: number; Negative: number };
}

interface SentimentResponse {
  stock: string;
  analysis: SentimentAnalysisItem[];
}

const SentimentAnalysis = () => {
  const [assetName, setAssetName] = useState("");
  const [data, setData] = useState<SentimentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSentiment = async () => {
    if (!assetName) return;
    setLoading(true);
    try {
      const response = await fetch(`https://tradingjournalpro-ai.onrender.com/sentiment/${assetName.trim(). replace(/\s+/g, "")}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching sentiment data:", error);
    }
    setLoading(false);
  };

  const getOverallSentiment = () => {
    if (!data || !data.analysis) return "";

    const sentimentCounts: Record<SentimentType, number> = {
      Positive: 0,
      Neutral: 0,
      Negative: 0,
    };

    data.analysis.forEach((item) => {
      sentimentCounts[item.sentiment]++;
    });

    const maxSentiment = Object.keys(sentimentCounts).reduce((a, b) =>
      sentimentCounts[a as SentimentType] > sentimentCounts[b as SentimentType] ? a : b
    ) as SentimentType;

    return maxSentiment === "Positive"
      ? "📈 Bullish Sentiment"
      : maxSentiment === "Negative"
      ? "📉 Bearish Sentiment"
      : "⚖️ Neutral Sentiment";
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-6 text-gray-900 dark:bg-gray-900 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Market Sentiment Analysis</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-200 w-full">
          <Input
            className="w-full bg-white text-gray-900 dark:text-gray-50 dark:bg-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-white px-4 py-2 rounded-md text-lg"
            placeholder="Enter stock name..."
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
          />
          <Button
            onClick={fetchSentiment}
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 px-5 py-2 text-lg rounded-md text-white flex items-center justify-center"
          >
            {loading ? <Loader className="animate-spin" />  : "Analyze"}
          </Button>
        </div>
      </motion.div>

      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-8 w-full max-w-3xl"
        >
          <h2 className="text-lg dark:text-gray-50 sm:text-xl font-medium mb-4">
            Analysis for: <span className="text-blue-600 font-semibold">{data.stock}</span>
          </h2>
          <motion.h3
            className="text-md sm:text-lg font-semibold mb-6 text-gray-700 dark:text-gray-50"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {getOverallSentiment()}
          </motion.h3>

          <div className="space-y-4">
            {data.analysis.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="bg-white border border-gray-300 dark:bg-gray-900 rounded-md shadow-sm p-4">
                  <CardContent>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-md font-medium block break-words"
                    >
                      {item.headline || "View Article"}
                    </a>
                    <div className="mt-3 flex flex-col sm:flex-row items-center gap-3">
                      <Badge
                        className={`px-3 py-1 text-sm font-medium rounded ${
                          item.sentiment === "Positive"
                            ? "bg-green-500 text-white"
                            : item.sentiment === "Neutral"
                            ? "bg-gray-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {item.sentiment}
                      </Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-50">
                        (Neg: {item.scores.Negative.toFixed(2)}, Neu: {item.scores.Neutral.toFixed(2)}, Pos:{" "}
                        {item.scores.Positive.toFixed(2)})
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SentimentAnalysis;
