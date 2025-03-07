import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { createUser, sendOTP, verifyOTP } from "@/api/user-api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [errors, setErrors] = useState({} as Record<string, string>);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value.trim() ? "" : `${name} is required` }));
  };

  const handleOtpSent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) {
      setErrors({
        email: formData.email ? "" : "Email is required",
        name: formData.name ? "" : "Name is required",
      });
      return;
    }
    setLoading(true);
    try {
      const result = await sendOTP({ email: formData.email, name: formData.name, useCase: "register", isLogin: false });
      if (result.success) {
        setIsOtpSent(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }
    setLoading(true);
    try {
      const result = await verifyOTP({ email: formData.email, otp: formData.otp, isBanAllowed: false });
      if (result.success) {
        setIsOtpVerified(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    setLoading(true);
    try {
      const result = await createUser({
        email: formData.email,
        name: formData.name,
        password: formData.password,
      });
      if (result.success) {
        setIsRegistered(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setRedirect(true);
    }
  }, []);

  if (redirect) {
    navigate("/");
  }

  if (isOtpVerified && isRegistered) {
    navigate("/login");
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
     
    >
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-xl rounded-xl dark:bg-gray-900 bg-white p-6">
        <CardHeader className="text-center mb-4">
          <h1 className="text-2xl font-bold text-blue-600">TradingJournalPro</h1>
          <p className="text-sm text-gray-600">Create an account to start tracking your trades</p>
        </CardHeader>
        <CardDescription>
          <form
            className="space-y-4"
            onSubmit={isOtpVerified ? handleRegister : isOtpSent ? handleVerifyOtp : handleOtpSent}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isOtpSent || loading}
                  placeholder="Enter your name"
                  className="mt-1 w-full"
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isOtpSent || loading}
                  placeholder="Enter your email"
                  className="mt-1 w-full"
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {isOtpSent && (
              <>
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <Input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Enter your OTP"
                    className="mt-1 w-full"
                  />
                  {errors.otp && <p className="text-sm text-red-500 mt-1">{errors.otp}</p>}
                </div>
              </>
            )}

            {isOtpVerified && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Create a password"
                    className="mt-1 w-full"
                  />
                  {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Confirm your password"
                    className="mt-1 w-full"
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            )}

            <Button
              type="submit"
              className={`w-full ${loading ? "bg-gray-400" : "bg-blue-500"} text-white hover:bg-blue-600 py-2 px-4 rounded-lg`}
              disabled={loading}
            >
              {loading ? "Please wait..." : isOtpVerified ? "Sign Up" : isOtpSent ? "Verify OTP" : "Send OTP"}
            </Button>
          </form>
        </CardDescription>
        <CardFooter className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
          
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
    </motion.div>
  );
};

export default RegisterPage;
