import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addHolding } from '@/api/holding-api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const HoldingForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assetName: "",
    quantity: "",
    boughtPrice: "",
    currentPrice: "",
    date: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!formData.boughtPrice || isNaN(Number(formData.boughtPrice))) {
      newErrors.boughtPrice = "Bought price must be a valid number.";
    }
    if (!formData.currentPrice || isNaN(Number(formData.currentPrice))) {
      newErrors.currentPrice = "Current price must be a valid number.";
    }
    if (!formData.date) {
      newErrors.date = "Date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validate()) return;
  
    setIsLoading(true);
    try {
      // Convert numeric fields to numbers
      const payload = {
        ...formData,
        quantity: Number(formData.quantity),
        boughtPrice: Number(formData.boughtPrice),
        currentPrice: Number(formData.currentPrice),
      };
  
      const response = await addHolding(payload, navigate);
  
      if (response.success) {
        toast.success(response.message);
        setFormData({
          assetName: "",
          quantity: "",
          boughtPrice: "",
          currentPrice: "",
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
      <h2 className="text-2xl font-bold">Holding Details</h2>
      <p className="text-gray-600">Start your journey—add your holdings now!</p>

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
            className="mt-1 block w-full dark:bg-gray-900  bg-white"
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
            className="mt-1 dark:bg-gray-900 block w-full bg-white"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
        </div>

        <div className="flex flex-col md:flex-row gap-4 ">
          {/* Bought Price */}
          <div className="flex-1">
            <label htmlFor="boughtPrice" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Bought Price
            </label>
            <Input
              type="text"
              id="boughtPrice"
              name="boughtPrice"
              value={formData.boughtPrice}
              onChange={handleChange}
              className="mt-1 dark:bg-gray-900 block w-full bg-white"
            />
            {errors.boughtPrice && <p className="text-red-500 text-sm">{errors.boughtPrice}</p>}
          </div>

          {/* Current Price */}
          <div className="flex-1">
            <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Current Price
            </label>
            <Input
              type="text"
              id="currentPrice"
              name="currentPrice"
              value={formData.currentPrice}
              onChange={handleChange}
              className="mt-1 dark:bg-gray-900 block w-full bg-white"
            />
            {errors.currentPrice && <p className="text-red-500 text-sm">{errors.currentPrice}</p>}
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
            className="mt-1 dark:bg-gray-900 block w-full bg-white"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
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

export default HoldingForm;
