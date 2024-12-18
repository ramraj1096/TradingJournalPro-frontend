import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { addTrade } from '@/api/trades-api';
import { Textarea } from '@/components/ui/textarea';
import { addJournal } from '@/api/journal-api';

const AddJournalForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assetName: "",
    quantity: "",
    assetType: "",
    tradeType: "",
    tradeCategory: "",
    journalFor: "",
    enterPrice: "",
    stopLoss: "",
    exitPrice: "",
    strategyName: "",
    strategyDescription: "",
    date: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const validate = () => {
    const newErrors: any = {};

    if (!formData.assetName.trim()) {
      newErrors.assetName = "Asset name is required.";
    }
    if (!formData.quantity || isNaN(Number(formData.quantity))) {
      newErrors.quantity = "Quantity must be a valid number.";
    }
    if (!formData.enterPrice || isNaN(Number(formData.enterPrice))) {
      newErrors.enterPrice = "Enter price must be a valid number.";
    }
    if (!formData.stopLoss || isNaN(Number(formData.stopLoss))) {
      newErrors.stopLoss = "Stoploss price must be a valid number.";
    }
    if (!formData.exitPrice || isNaN(Number(formData.exitPrice))) {
      newErrors.exitPrice = "Exit price must be a valid number.";
    }
    if (!formData.date) {
      newErrors.date = "Date is required.";
    }
    if (!formData.assetType) {
      newErrors.assetType = "Asset type is required.";
    }
    if (!formData.tradeType) {
      newErrors.tradeType = "Trade type is required.";
    }
    if (!formData.journalFor) {
      newErrors.tradeType = "Journal for is required.";
    }
    if (!formData.tradeCategory) {
      newErrors.tradeCategory = "Trade category is required.";
    }
    if (!formData.strategyName.trim()) {
      newErrors.strategyName = "Strategy name is required.";
    }
    if (!formData.strategyDescription.trim()) {
      newErrors.strategyDescription = "Strategy description is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        quantity: Number(formData.quantity),
        enterPrice: Number(formData.enterPrice),
        exitPrice: Number(formData.exitPrice),
        stopLoss: Number(formData.stopLoss),
      };

      const response = await addJournal(payload, navigate);

      if (response.success) {
        toast.success(response.message);
        setFormData({
          assetName: "",
          quantity: "",
          assetType: "",
          tradeType: "",
          tradeCategory: "",
          journalFor: "",
          enterPrice: "",
          stopLoss: "",
          exitPrice: "",
          strategyName: "",
          strategyDescription: "",
          date: "",
        });
        setErrors({});
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 dark:bg-gray-900 bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Journal Details</h2>
      <p className="text-gray-600">Start your journey—add your journals now!</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Asset Name */}
        <div>
          <label htmlFor="assetName" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Asset Name
          </label>
          <Input
            type="text"
            id="assetName"
            name="assetName"
            value={formData.assetName}
            onChange={handleChange}
            className="mt-1 block w-full dark:bg-gray-900 bg-white"
          />
          {errors.assetName && <p className="text-red-500 text-sm">{errors.assetName}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Quantity
          </label>
          <Input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full dark:bg-gray-900 bg-white"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
        </div>

        {/* Enter Price, Exit Price, Stop Loss */}
        <div className="flex flex-col md:flex-row gap-4 dark:text-slate-300">
          <div className="flex-1">
            <label htmlFor="enterPrice" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Enter Price
            </label>
            <Input
              type="text"
              id="enterPrice"
              name="enterPrice"
              value={formData.enterPrice}
              onChange={handleChange}
              className="mt-1 block w-full dark:bg-gray-900 bg-white"
            />
            {errors.enterPrice && <p className="text-red-500 text-sm">{errors.enterPrice}</p>}
          </div>

          <div className="flex-1">
            <label htmlFor="exitPrice" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Exit Price / Target Price
            </label>
            <Input
              type="text"
              id="exitPrice"
              name="exitPrice"
              value={formData.exitPrice}
              onChange={handleChange}
              className="mt-1 block w-full dark:bg-gray-900 bg-white"
            />
            {errors.exitPrice && <p className="text-red-500 text-sm">{errors.exitPrice}</p>}
          </div>

          <div className="flex-1">
            <label htmlFor="stopLoss" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Stop Loss
            </label>
            <Input
              type="text"
              id="stopLoss"
              name="stopLoss"
              value={formData.stopLoss}
              onChange={handleChange}
              className="mt-1 block w-full dark:bg-gray-900 bg-white"
            />
            {errors.stopLoss && <p className="text-red-500 text-sm">{errors.stopLoss}</p>}
          </div>
        </div>

        {/* Asset Type, Trade Type, Trade Category */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="assetType" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Asset Type
            </label>
            <Select
              value={formData.assetType}
              onValueChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  assetType: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equity">Equity</SelectItem>
                <SelectItem value="option">Option</SelectItem>
                <SelectItem value="commodity">Commodity</SelectItem>
              </SelectContent>
            </Select>
            {errors.assetType && <p className="text-red-500 text-sm">{errors.assetType}</p>}
          </div>

          <div className="flex-1">
            <label htmlFor="tradeType" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Trade Type
            </label>
            <Select
              value={formData.tradeType}
              onValueChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  tradeType: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Trade Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Swing Trade">Swing Trade</SelectItem>
                <SelectItem value="Day Trade">Day Trade</SelectItem>
                <SelectItem value="BTST">BTST</SelectItem>
              </SelectContent>
            </Select>
            {errors.tradeType && <p className="text-red-500 text-sm">{errors.tradeType}</p>}
          </div>

          <div className="flex-1">
            <label htmlFor="tradeType" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Journal For
            </label>
            <Select
              value={formData.journalFor}
              onValueChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  journalFor: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Trade Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Holding">Holding</SelectItem>
                <SelectItem value="Trade">Trade</SelectItem>
               
              </SelectContent>
            </Select>
            {errors.tradeType && <p className="text-red-500 text-sm">{errors.tradeType}</p>}
          </div>


        <div className="flex-1">
            <label htmlFor="tradeCategory" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Trade Category
            </label>
            <Select
              value={formData.tradeCategory}
              onValueChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  tradeCategory: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Trade Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>
            {errors.tradeCategory && <p className="text-red-500 text-sm">{errors.tradeCategory}</p>}
        </div>
    </div>


        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Date
          </label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full dark:bg-gray-900 bg-white"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="strategyName" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Strategy Name
          </label>
          <Input
            type="text"
            id="strategyName"
            name="strategyName"
            value={formData.strategyName}
            onChange={handleChange}
            className="mt-1 block w-full dark:bg-gray-900 bg-white"
          />
          {errors.strategyName && <p className="text-red-500 text-sm">{errors.strategyName}</p>}
        </div>
        <div>
          <label htmlFor="strategyDescription" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Strategy Description
          </label>
          <Textarea
            
            id="strategyDescription"
            name="strategyDescription"
            rows={10}
            value={formData.strategyDescription}
            onChange={handleChange}
            className="mt-1 block w-full dark:bg-gray-900 bg-white"
          />
          {errors.strategyDescription && <p className="text-red-500 text-sm">{errors.strategyDescription}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            className="bg-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddJournalForm;
