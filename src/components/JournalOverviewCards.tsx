import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { getOverviewofJournals } from "@/api/journal-api";

const JournalOverviewCards = () => {
  const navigate = useNavigate();

  const [totalInvestedValue, setTotalInvestedValue] = useState(0);
  const [currentInvestmentValue, setCurrentInvestmentValue] = useState(0);
  const [profits, setProfits] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    const fetchOverviewDetails = async () => {
      try {
        const response = await getOverviewofJournals(navigate);
        console.log(response);
        if (response.success) {
          setTotalInvestedValue(response.totalTradedVal);
          setCurrentInvestmentValue(response.currentInvestmentValue);
          setProfits(response.totalProfit);
          setLosses(response.totalLoss);
          toast.success(response.message);
        } else {
          toast.info("Not enough data");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchOverviewDetails();
  }, [navigate]);

  const formatCurrency = (value:number) => {
    return value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 md:flex-nowrap">
      {/* Total Invested Value Card */}
      <Card className="w-full max-w-xs md:max-w-sm">
        <CardHeader>
          <h1 className="text-lg font-bold text-gray-700 dark:text-slate-300">Total Traded Value</h1>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-blue-600">{formatCurrency(totalInvestedValue)}</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 dark:text-slate-300">Summary of all investments</p>
        </CardFooter>
      </Card>

      {/* Current Investment Value Card */}
      <Card className="w-full max-w-xs md:max-w-sm">
        <CardHeader>
          <h1 className="text-lg font-bold text-gray-700 dark:text-slate-300">Current Portfolio Value</h1>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-green-600">{formatCurrency(currentInvestmentValue)}</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 dark:text-slate-300">Updated value of investments</p>
        </CardFooter>
      </Card>

      {/* Total Profits Card */}
      <Card className="w-full max-w-xs md:max-w-sm">
        <CardHeader>
          <h1 className="text-lg font-bold text-gray-700 dark:text-slate-300">Total Profits</h1>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-green-500">{formatCurrency(profits)}</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 dark:text-slate-300">All-time profits earned</p>
        </CardFooter>
      </Card>

      {/* Total Losses Card */}
      <Card className="w-full max-w-xs md:max-w-sm">
        <CardHeader>
          <h1 className="text-lg font-bold text-gray-700 dark:text-slate-300">Total Losses</h1>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-red-500">{formatCurrency(losses)}</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 dark:text-slate-300">All-time losses incurred</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JournalOverviewCards;
