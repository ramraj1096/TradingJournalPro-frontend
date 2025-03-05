"use client";


import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { chartAnalyticsDataofJournals } from "@/api/journal-api";


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export function AnalyticsChartOfJournals() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await chartAnalyticsDataofJournals(navigate);
        console.log(response)

        if (response.success) {
          if (response.journals.length === 0) {
            toast.info("No active holdings!");
          } else {
            setData(response.journals);
          }
        } else {
          toast.error(response.message || "Failed to fetch journals.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching journals.");
      }
    };

    fetchChartData();
  }, [navigate]);

  return (
    <Card className="max-w-4xl mx-auto p-6 border border-muted rounded-lg shadow-md bg-white dark:bg-gray-900">
      <CardHeader className="text-left mb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-slate-300">Journal Analytics</CardTitle>
        
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="w-full h-72 md:h-96">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="assetName"
                 
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  
                  className="text-sm text-gray-400"
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={{ fill: "#f9fafb", opacity: 0.2 }}
                  content={<ChartTooltipContent indicator="solid" />}
                />
                <Bar
                  dataKey="totalTradedValue"
                  fill="#60a5fa"
                  radius={[8, 8, 0, 0]}
                />
                <Bar dataKey="PL" fill="#34d399" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-3">
        
      </CardFooter>
    </Card>
  );
}
