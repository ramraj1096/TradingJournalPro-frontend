import { loginUser, sendOTP, verifyOTP } from "@/api/user-api";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false); // Loading state

  const [otpFormData, setOtpFormData] = useState({
    name: "",
    email: "",
    useCase: "login",
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setOtpFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value.trim() ? "" : `${name} is required` }));

    if (name === "email") {
      setOtpVerifyFormData((prev) => ({ ...prev, email: value }));
      setFormData((prev) => ({ ...prev, email: value }));
    }
  };

  const handleOtpChange = (e: any) => {
    const { name, value } = e.target;
    setOtpVerifyFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value.trim() ? "" : `${name} is required` }));
  };

  const [name, setName] = useState("");
  const handlePasswordChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value.trim() ? "" : `${name} is required` }));
  };

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    if (!otpVerifyFormData.otp) {
      setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      return;
    }
    setLoading(true); // Set loading to true
    try {
      const verifyOtpRequest = {
        email: otpVerifyFormData.email,
        otp: otpVerifyFormData.otp,
        isBanAllowed: false,
      };
      const response = await verifyOTP(verifyOtpRequest);
      if (response.success) {
        toast.success(`Welcome back ${name}!`);
        setOtpVerified(true);
        setRedirect(true);
      } else {
        toast.error("Invalid OTP, Login failed");
        localStorage.removeItem('user');
        navigate("/");
      }
    } catch (error: any) {
      toast.error("Failed to verify OTP.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!formData.password) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is required",
        password: "Password is required",
      }));
      return;
    }
    setLoading(true); // Set loading to true
    try {
      const response = await loginUser(formData);
      if (response.success) {
        setName(response.user.name);
        toast.success(response.message);

        const sendOtpRequest = {
          name: "Login User",
          useCase: "login",
          email: formData.email,
          password: formData.password,
          isLogin: true,
        };

        const otpSenttoUser = await sendOTP(sendOtpRequest);
        if (otpSenttoUser.success) {
          toast.success(otpSenttoUser.message);
          setOtpSent(true);
        } else {
          toast.error(otpSenttoUser.message);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error("Failed to log in.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setRedirect(true);
    }
  }, []);

  if (redirect) {
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-xl rounded-xl dark:bg-gray-900 bg-gray-50 p-6">
        <CardHeader className="text-center mb-4">
          <h1 className="text-2xl font-bold text-blue-600">TradingJournalPro</h1>
          <p className="text-sm text-gray-600">Track your trades like a pro</p>
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
                disabled={otpSent || loading}
                className="mt-1 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {!otpSent && (
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
            )}

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
                  disabled={otpVerified || loading}
                  value={otpVerifyFormData.otp}
                  onChange={handleOtpChange}
                  className="mt-1 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                  required
                />
                {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
              </div>
            )}

            <Button
              onClick={!otpSent ? handleLogin : handleVerifyOtp}
              disabled={loading}
              className={`w-full text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 py-2 px-4 rounded-lg flex items-center justify-center ${
                loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"
              }`}
            >
              {loading ? "Please wait" : (!otpSent ? "Sign In" : "Verify OTP")}
            </Button>
          </form>
        </CardDescription>
        <CardFooter className="text-center text-sm text-gray-500 mt-4 justify-between">
          <p className="text-gray-600">
            Don’t have an account?{' '}
            <Link to={'/register'} className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-gray-600 mt-2">
            <Link to={'/reset-password'} className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
