import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const API_KEY = import.meta.env.VITE_AI_API_KEY as string;

const AiStrategyCheck = () => {
  const [strategyName, setStrategyName] = useState("");
  const [indicators, setIndicators] = useState("");
  const [extras, setExtras] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!strategyName.trim())
      newErrors.strategyName = "Strategy name is required.";
    if (!indicators.trim())
      newErrors.indicators = "At least one indicator is required.";
    if (!description.trim() || description.length < 10)
      newErrors.description =
        "Description must be at least 10 characters long.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePrompt = () => {
    const trimmedDescription =
      description.length > 1000
        ? description.slice(0, 1000) + "... (truncated)"
        : description;

    return `
You are an expert trading analyst. Evaluate the following trading strategy.

## Strategy Overview
• Name: ${strategyName}
• Key Indicators: ${indicators}
${extras ? `• Additional Tools: ${extras}` : ""}

## Description Summary
${trimmedDescription}

---

## Instructions
Analyze the strategy and provide structured feedback in this format:

1. <strong>Quick Summary:</strong> A short summary of the strategy 50 words.
2. <strong>Technical Analysis:</strong> Insights into how the indicators work together top 5 bullet points only.
3. <strong>Strengths:</strong> Bullet points of strengths 5 bullet points only.
4. <strong>Weaknesses:</strong> Bullet points of weaknesses 5 bullet points only.
5. <strong>Risk Assessment:</strong> Key risks and what to watch out for 5 bullet points only.
6. <strong>Improvement Suggestions:</strong> Actionable suggestions to enhance the strategy 5 bullet points only.

Respond using bullet points and short. Be direct and professional.
    `;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setAiResponse(null);

    const prompt = generatePrompt();

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );

      const data = await response.json();
      let aiMessage =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";

      aiMessage = aiMessage
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/-\s/g, "• ")
        .replace(/\n/g, "<br/>");

      setAiResponse(aiMessage);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error fetching AI analysis. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg"
    >
      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            AI-Powered Trading Strategy Evaluator
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Strategy Name"
              value={strategyName}
              onChange={setStrategyName}
              error={errors.strategyName}
              placeholder="Enter strategy name..."
            />

            <InputField
              label="Indicators"
              value={indicators}
              onChange={setIndicators}
              error={errors.indicators}
              placeholder="Enter indicators used..."
            />

            <InputField
              label="Extras (Optional)"
              value={extras}
              onChange={setExtras}
              placeholder="E.g., custom scripts, timeframes..."
            />

            <TextareaField
              label="Strategy Description"
              value={description}
              onChange={setDescription}
              error={errors.description}
              placeholder="Explain your strategy in detail..."
            />

            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Evaluate Strategy"}
              </Button>
            </motion.div>
          </form>

          {loading && (
            <div className="mt-6 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          )}

          {aiResponse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border"
            >
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                AI Feedback:
              </h3>
              <div
                className="text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: aiResponse }}
              />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  error?: string;
}) => (
  <div>
    <label className="block text-gray-700 dark:text-gray-200">{label}</label>
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const TextareaField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  error?: string;
}) => (
  <div>
    <label className="block text-gray-700 dark:text-gray-200">{label}</label>
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default AiStrategyCheck;
