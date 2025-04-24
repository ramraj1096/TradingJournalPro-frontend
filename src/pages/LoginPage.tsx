import { loginUser } from "@/api/user-api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() ? "" : `${name} is required`,
    }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrors({
        email: formData.email ? "" : "Email is required",
        password: formData.password ? "" : "Password is required",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await loginUser(formData);
      if (response.success) {
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-center"
    >
      <Card className="w-full max-w-lg shadow-xl rounded-xl dark:bg-gray-900 bg-gray-50 p-6">
        <CardHeader className="text-center mb-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold text-blue-600"
          >
            TradingJournalPro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm text-gray-600"
          >
            Track your trades like a pro
          </motion.p>
        </CardHeader>
        <CardDescription>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
            onSubmit={handleLogin}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="mt-1 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                  required
                />
              </motion.div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="mt-1 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                  required
                />
              </motion.div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={loading}
                className={`w-full text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 py-2 px-4 rounded-lg flex items-center justify-center ${
                  loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"
                }`}
              >
                {loading ? "Please wait" : "Sign In"}
              </Button>
            </motion.div>
          </motion.form>
        </CardDescription>
        <CardFooter className="text-center text-sm text-gray-500 mt-4 justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-600"
          >
            Don’t have an account?{" "}
            <Link to={"/register"} className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-gray-600 mt-2"
          >
            <Link
              to={"/reset-password"}
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </motion.p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LoginPage;
