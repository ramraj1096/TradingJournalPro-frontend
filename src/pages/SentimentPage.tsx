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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSentiment = async () => {
    if (!assetName) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(
        `https://tradingjournalpro-ai.onrender.com/sentiment/${assetName.trim().replace(/\s+/g, "")}`
      );
      const result = await response.json();
      console.log(result)

      if (result.error) {
        setError("No news found for this stock. Please try a different stock symbol.");
      } else {
        setData(result);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
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
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 sm:px-8 py-6 flex flex-col items-center">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-semibold mb-6">Market Sentiment Analysis</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg shadow-md border w-full max-w-2xl">
          <Input
            className="w-full text-lg px-4 py-2 rounded-md border"
            placeholder="Enter stock name..."
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
          />
          <Button onClick={fetchSentiment} disabled={loading} className="bg-blue-600 hover:bg-blue-500 px-5 py-2 text-lg rounded-md text-white">
            {loading ? <Loader className="animate-spin" /> : "Analyze"}
          </Button>
        </div>
      </motion.div>

      {error && <motion.div className="mt-6 text-red-600">❌ {error}</motion.div>}

      {data && !error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mt-8 w-full max-w-2xl">
          <h2 className="text-xl font-medium mb-4">Analysis for: <span className="text-blue-600 font-semibold">{data.stock}</span></h2>
          <motion.h3 className="text-lg font-semibold mb-6">{getOverallSentiment()}</motion.h3>

          <div className="space-y-4">
            {data.analysis.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                <Card className="bg-white dark:bg-gray-900 border rounded-md shadow-sm p-4">
                  <CardContent>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium block">
                      {item.headline || "View Article"}
                    </a>
                    <div className="mt-3 flex items-center gap-3">
                      <Badge className={`px-3 py-1 text-sm rounded ${
                        item.sentiment === "Positive" ? "bg-green-500 text-white" :
                        item.sentiment === "Neutral" ? "bg-gray-500 text-white" : "bg-red-500 text-white"}`}
                      >
                        {item.sentiment}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        (Neg: {item.scores.Negative.toFixed(4)}, Neu: {item.scores.Neutral.toFixed(4)}, Pos: {item.scores.Positive.toFixed(4)})
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
