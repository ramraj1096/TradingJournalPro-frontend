import {
  LoginUserRequest,
  LoginUserResult,
  RegisterUserRequest,
  RegisterUserResult,
  SendOTPRequest,
  SendOTPResult,
  VerifyOTPRequest,
  VerifyOTPResult,
} from "@/types";
import axios from "axios";
import { toast } from "sonner";

console.log(import.meta.env);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;



/**
 * Sends an OTP to the provided contact details.
 */
export const sendOTP = async (data: SendOTPRequest): Promise<SendOTPResult> => {
  try {
    const response = await axios.post<SendOTPResult>(`${API_BASE_URL}/api/otp/SendOTP`, data);
    
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error:any) {
    console.error("Error sending OTP:", error.response.data);
    toast.error("Failed to send OTP. Please try again.");

    // Return default failure response
    return {
      success: false,
      message: error.response.data.message || "An error occured in sending otp",
    };
  }
};

/**
 * Verifies the provided OTP.
 */
export const verifyOTP = async (data: VerifyOTPRequest): Promise<VerifyOTPResult> => {
  try {
    const response = await axios.post<VerifyOTPResult>(`${API_BASE_URL}/api/otp/verifyOTP`, data);
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error:any) {
    console.error("Error verifying OTP:", error);
    toast.error("Failed to verify OTP. Please try again.");

    // Return default failure response
    return {
      success: false,
      message: error.response.data.message || "An error occured in sending otp",
    };
  }
};

/**
 * Registers a new user.
 */
export const createUser = async (data: RegisterUserRequest): Promise<RegisterUserResult> => {
  try {
    const response = await axios.post<RegisterUserResult>(`${API_BASE_URL}/api/users/register`, data);
    return {
      success: response.data.success,
      message: response.data.message,
      user: response.data.user, 
    };
  } catch (error: any) {
    console.error("Error registering user:", error);
    toast.error("Failed to register user. Please try again.");

   
    return {
      success: false,
      message: error.response.data.message ||"An error occurred while registering the user.",
      user: null,
    };
  }
};


/**
 * Login .
 */
export const loginUser = async (data: LoginUserRequest): Promise<LoginUserResult> => {
  try {
    const response = await axios.post<LoginUserResult>(`${API_BASE_URL}/api/users/login`, data);

    const token = response.data.token;

    if (response.data.success && token) {
      const user = {
        
        authToken: token,
        id: response.data.user._id,
        email: response.data.user.email,
      };

      // Store user info and token in localStorage
      localStorage.setItem('user', JSON.stringify(user));
     

      // Optionally, set Authorization header for future requests
      axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return {
      success: response.data.success,
      message: response.data.message,
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error: any) {
    console.error("Error logging in user:", error);

    const errorMessage = error.response?.data?.message || "An unexpected error occurred during login.";
    toast.error(errorMessage);

    return {
      success: false,
      message: errorMessage,
      token: "",
      user: null,
    };
  }
};



/**
 * Edit user profile
 */

export const editUser = async (data: any): Promise<any> => {
  try {

    const storedUser = localStorage.getItem("user");

    
    let userId = "";
    if (storedUser) {
      const user = JSON.parse(storedUser);
      
      userId = user.id;
      
    }

    const response = await axios.put<any>(`${API_BASE_URL}/api/users/${userId}`, data);
    return {
      success: response.data.success,
      message: response.data.message,
      
    };
  } catch (error: any) {
    console.error("Error updating user:", error);
    toast.error("Failed to update user. Please try again.");

   
    return {
      success: false,
      message: error.response.data.message ||"An error occurred while updating the user.",
      user: null,
    };
  }
}

export const resetPassword = async (data: any): Promise<any> => {
  try {
  
    const response = await axios.post<any>(`${API_BASE_URL}/api/users/reset`, data);
    return {
      success: response.data.success,
      message: response.data.message,
      
    };
  } catch (error: any) {
    console.error("Error updating password:", error);
    toast.error("Failed to update password. Please try again.");

   
    return {
      success: false,
      message: error.response.data.message ||"An error occurred while updating the  password.",
      user: null,
    };
  }
}