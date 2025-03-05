import { editUser } from "@/api/user-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "", // Matches the name of the field in the state
  });
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the correct field
    }));
  };

  const validate = () => {
    const newErrors: { name?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default behavior to avoid dialog close

    if (!validate()) return;

    try {
      const response = await editUser(formData);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast.error("Error in updating user!");
    }
  };

  return (
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <Input
        type="text"
        id="name"
        name="name" // Matches the state key
        value={formData.name}
        onChange={handleChange}
        className="mt-1 block w-full bg-white"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name}</p>
      )}
      <Button
        className="mt-3 bg-sky-400"
        type="button" // Prevent default form submission
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default UserProfileForm;
