import { resetPassword, sendOTP, verifyOTP } from "@/api/user-api";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form Data States
  const [otpFormData, setOtpFormData] = useState({
    name: "",
    email: "",
    useCase: "resetPassword",
    isLogin: true,
  });

  const [otpVerifyFormData, setOtpVerifyFormData] = useState({
    email: "",
    otp: "",
    isBanAllowed: false,
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOtpFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value.trim() ? "" : `${name} is required` }));

    if (name === "email") {
      setOtpVerifyFormData((prev) => ({ ...prev, email: value }));
      setFormData((prev) => ({ ...prev, email: value }));
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOtpVerifyFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value.trim() ? "" : `${name} is required` }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value.trim() ? "" : `${name} is required` }));
  };

  // Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpFormData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }

    setLoading(true);
    try {
      const response = await sendOTP(otpFormData);
      if (response.success) {
        toast.success("OTP sent successfully!");
        setOtpSent(true);
      } else {
        toast.error(response.message || "Failed to send OTP.");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerifyFormData.otp) {
      setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOTP(otpVerifyFormData);
      if (response.success) {
        toast.success(`OTP verified!`);
        setOtpVerified(true);
      } else {
        toast.error(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword(formData);
      if (response.success) {
        toast.success("Password changed successfully! Redirecting...");
        setOtpSent(false);
        setOtpVerified(false);
        navigate("/login"); // Redirect after success
      } else {
        toast.error(response.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      
    >
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-xl rounded-xl dark:bg-gray-900 bg-gray-50 p-6">
        <CardHeader className="text-center mb-4">
          <h1 className="text-2xl font-bold text-blue-600">TradingJournalPro</h1>
          <p className="text-sm text-gray-600">Reset your password and regain access</p>
        </CardHeader>
        <CardDescription>
          <form className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={otpSent}
                className="mt-1 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* OTP Input */}
            {otpSent && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <Input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otpVerifyFormData.otp}
                  onChange={handleOtpChange}
                  disabled={loading} // Keep input enabled unless loading
                  className="mt-1 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                  required
                />
                {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
              </div>
            )}

            {/* OTP Button */}
            <Button
              disabled={otpVerified || loading}
              onClick={!otpSent ? handleSendOtp : handleVerifyOtp}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 py-2 px-4 rounded-lg flex items-center justify-center"
            >
              {loading ? <Loader className="animate-spin" /> : !otpSent ? "Send OTP" : "Verify OTP"}
            </Button>

            {/* Password Reset Form */}
            {otpVerified && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your new password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className="mt-1 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                    required
                  />
                </div>
                <Button onClick={handleChangePassword} className="w-full bg-blue-500 text-white hover:bg-blue-600">
                  Change Password
                </Button>
              </>
            )}
          </form>
        </CardDescription>
      </Card>
    </div>
    </motion.div>
  );
};

export default ForgetPasswordPage;
