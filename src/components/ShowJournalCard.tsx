import { getJournal } from "@/api/journal-api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

interface ShowJournalCardProps {
  path: string;
}

const ShowJournalCard: React.FC<ShowJournalCardProps> = ({ path }) => {
  const navigate = useNavigate();
  const [journal, setJournal] = useState<any | null>(null);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await getJournal(navigate, path);

        if (response.success) {
          if (!response.journal) {
            toast.info("No journal details found!");
          } else {
            setJournal(response.journal);
          }
        } else {
          toast.error(response.message || "Failed to fetch journal.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching the journal.");
      }
    };

    fetchJournal();
  }, [path, navigate]);

  if (!journal) {
    return (
      <Card className="dark:bg-gray-900 shadow-md w-full max-w-md p-4">
        <CardContent>
          <p className="text-center text-gray-500">Loading journal details...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dark:bg-gray-900 shadow-md w-full max-w-md p-4 bg-white">
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-300">Journal Details</h2>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between ">
            <span className="text-gray-600 font-medium dark:text-slate-300">Asset Name:</span>
            <span className="text-gray-800 dark:text-slate-300">{journal.assetName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium dark:text-slate-300">Asset Type:</span>
            <span className="text-gray-800 dark:text-slate-300">{journal.assetType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium dark:text-slate-300">Quantity:</span>
            <span className="text-gray-800 dark:text-slate-300">{journal.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium dark:text-slate-300">Trade Value:</span>
            <span className="text-gray-800 dark:text-slate-300">{journal.totalTradedValue.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 2,
            })}</span>
          </div>
          <div className="flex justify-between dark:text-slate-300">
            <span className="text-gray-600 font-medium dark:text-slate-300">Profit / Loss:</span>
            <span
              className={`font-medium ${
                journal.profitorLoss > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {journal.profitorLoss.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium dark:text-slate-300">Date:</span>
            <span className="text-gray-800 dark:text-slate-300">
              {new Date(journal.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium dark:text-slate-300">Journal For:</span>
            <span className="text-gray-800 dark:text-slate-300">{journal.journalFor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium dark:text-slate-300">Strategy Name:</span>
            <span className="text-gray-800 dark:text-slate-300">{journal.strategyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium dark:text-slate-300">Strategy Description:</span>
            <span className="text-gray-800 dark:text-slate-300">{journal.strategyDescription}</span>
          </div>
        </div>
        {/* <Button
          variant="outline"
          className="mt-4 w-full"
          onClick={() => navigate(`/journals/${journal._id}`)}
        >
          View Full Journal
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default ShowJournalCard;
