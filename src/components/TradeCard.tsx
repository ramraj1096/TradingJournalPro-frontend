import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from './ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { getAllTrades, performSquareoffTrade, updateAssetExitPrice } from '@/api/trades-api';

type OrderStatus = 'Hold' | 'Squareoff';

const TradeCard: React.FC = () => {
  const navigate = useNavigate();
  const [trades, setTrades] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<Record<string, number>>({}); // Track price input for each holding

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await getAllTrades(navigate);

        if (response.success) {
          if (response.trades.length === 0) {
            toast.info('No active trades!');
          } else {
            setTrades(response.trades);
          }
        } else {
          toast.error(response.message || 'Failed to fetch holdings.');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching holdings.');
      }
    };

    fetchTrades();
  }, [navigate]);

  const handleStatusChange = (value: string, holdingId: string) => {
    setStatus(value);

    if (value === 'Squareoff') {
      performSquareoffTrade(navigate, holdingId)
        .then((response: any) => {
          if (response.success) {
            toast.success(response.message);
          } else {
            toast.error(response.message || 'Failed to perform squareoff.');
          }
        })
        .catch((error: any) => {
          toast.error(error.message || 'Error performing squareoff.');
        });
    }
  };

  const handlePriceChange = (id: string) => {
    const newPrice = currentPrice[id];
    
    if (newPrice <= 0 || isNaN(newPrice)) {
      toast.error('Please enter a valid positive price.');
      return;
    }

    updateAssetExitPrice(navigate, id, Number(newPrice))
      .then((response: any) => {
        if (response.success) {
          toast.success('Price updated successfully!');
        } else {
          toast.error('Failed to update price.');
        }
      })
      .catch((error: any) => {
        toast.error(error.message || 'Error updating price.');
      });
  };

  const orderStatuses: OrderStatus[] = ['Hold', 'Squareoff'];

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const calculateProfitLoss = (profitLoss: number) => {
    return isNaN(profitLoss) ? 0 : profitLoss; // Ensure profitLoss is a valid number
  };

  const calculateOverallProfitLoss = () => {
    return trades.reduce(
      (acc, trade) => acc + calculateProfitLoss(trade.profitOrLoss),
      0
    );
  };

  const overallProfitLoss = calculateOverallProfitLoss();
  const overallProfitLossClass = overallProfitLoss >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{trades.length} Active Trades</h2>
        <div className={`font-bold text-xl ${overallProfitLossClass}`}>
          Overall Profit/Loss: {overallProfitLoss >= 0 ? `+${overallProfitLoss.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
          })}` : overallProfitLoss.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
          })}
        </div>
      </div>

      {trades.length === 0 ? (
        <p className="text-gray-600">No Trades available.</p>
      ) : (
        trades.map((trade) => {
          const profitLoss = calculateProfitLoss(trade.profitOrLoss);
          const profitLossClass = profitLoss >= 0 ? 'text-green-500' : 'text-red-500';

          return (
            <Card key={trade._id} className="mb-4 dark:bg-gray-900 bg-white shadow-lg rounded-lg p-4 ">
              <CardHeader>
                <CardTitle className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 justify-between mb-3">
                  <div>
                    Asset Name:
                    <span className="ml-2 font-normal">{trade.assetName}</span>
                  </div>
                  <div>
                    Held Quantity:
                    <span className="ml-2 font-normal">{trade.quantity}</span>
                  </div>
                  <div>
                    Date:
                    <span className="ml-2 font-normal">{formatDate(trade.date)}</span>
                  </div>
                  <div>
                    Total Cost:
                    <span className="ml-2 font-normal">{trade.totalTradeValue.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                    })}</span>
                  </div>
                  <div>
                    Enter Price:
                    <span className="ml-2 font-normal">{trade.enterPrice.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                    })}</span>
                  </div>
                  <div>
                    Stop Loss:
                    <span className="ml-2 font-normal">{trade.stopLoss.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                    })}</span>
                  </div>

                  <div>
                    Trade Type:
                    <span className="ml-2 font-normal">{trade.tradeType}</span>
                  </div>
                  <div>
                    Profit/Loss:
                    <span className={`ml-2 font-normal ${profitLossClass}`}>
                      {profitLoss >= 0 ? `+${profitLoss.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 2,
                      })}` : profitLoss.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </CardTitle>
                <Separator />
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`status-${trade._id}`} className="text-sm">What is the status of your holding?</Label>
                  <Select
                    value={status}
                    onValueChange={(value) => handleStatusChange(value, trade._id)}
                  >
                    <SelectTrigger id={`status-${trade._id}`} className="w-full text-sm">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {orderStatuses.map((statusOption) => (
                        <SelectItem key={statusOption} value={statusOption} className="hover:bg-blue-100 text-sm">
                          {statusOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Section to Update exit Price */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`price-${trade._id}`} className="text-sm">Update Exit Price</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      id={`price-${trade._id}`}
                      value={currentPrice[trade._id] || ''}
                      onChange={(e) => setCurrentPrice((prev) => ({ ...prev, [trade._id]: Number(e.target.value) }))}
                      className="border border-gray-300 p-1.5 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 w-28"
                      placeholder="Enter price"
                    />
                    <Button
                      onClick={() => handlePriceChange(trade._id)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </CardContent>

            </Card>

          );
        })
      )}
      <div>
        <Button
          className='bg-sky-500 float-end'
          onClick={() => {
            navigate("/trades/analytics")
          }}
        >View Analytics</Button>
      </div>
    </div>
  );
};

export default TradeCard;
