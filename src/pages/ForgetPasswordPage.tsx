import { resetPassword, sendOTP, verifyOTP } from "@/api/user-api";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
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

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

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

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerifyFormData.otp) {
      setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      return;
    }
    try {
      const verifyOtpRequest = {
        email: otpVerifyFormData.email,
        otp: otpVerifyFormData.otp,
        isBanAllowed: false,
      };
      const response = await verifyOTP(verifyOtpRequest);
      if (response.success) {
        toast.success(`Welcome back ${otpFormData.name}!`);
        setOtpVerified(true);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error("Failed to verify OTP.");
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await sendOTP(otpFormData);
      if (response.success) {
        toast.success("OTP sent");
        setOtpSent(true);
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (error: any) {
      toast.error("Failed to send OTP.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await resetPassword(formData);
      if (response.success) {
        toast.success(response.message);
        setOtpSent(false); 
        setOtpVerified(false);
        setRedirect(true);
      } else {
        toast.error("Failed to change password.");
      }
    } catch (error: any) {
      toast.error("Failed to change password.");
    }
  };

  const [redirect, setRedirect] = useState(false);
  

  useEffect(() => {
    if (redirect) {
      navigate("/login");
    }
  }, [redirect, navigate]);

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-xl rounded-xl dark:bg-gray-900 bg-gray-50 p-6">
        <CardHeader className="text-center mb-4">
          <h1 className="text-2xl font-bold text-blue-600">TradingJournalPro</h1>
          <p className="text-sm text-gray-600">Reset your password and regain access</p>
        </CardHeader>
        <CardDescription>
          <form className="space-y-4">
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

            {otpSent && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <Input
                  type="text"
                  id="otp"
                  name="otp"
                  disabled = {otpVerified}
                  placeholder="Enter OTP"
                  value={otpVerifyFormData.otp}
                  onChange={handleOtpChange}
                  className="mt-1 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                  required
                />
                {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
              </div>
            )}

            <Button
            disabled = {otpVerified}
              onClick={!otpSent ? handleSendOtp : handleVerifyOtp}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 py-2 px-4 rounded-lg flex items-center justify-center"
            >
              {!otpSent ? "Verify Email" : "Verify OTP"}
            </Button>

            {otpVerified && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className="mt-1 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                    required
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <Button
                  onClick={handleChangePassword}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 py-2 px-4 rounded-lg"
                >
                  Change Password
                </Button>
              </>
            )}
          </form>
        </CardDescription>
        <CardFooter className="text-center text-sm text-gray-500 mt-4 justify-between">
          <p className="text-gray-600">Back to Login ?{' '}
            <Link to={'/login'} className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
          
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgetPasswordPage;
