import { AddHoldingRequest, AddHoldingResponse, chartDataResponse, getAllHoldingsResult, HoldingsOverviewResponse } from "@/types";
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const addHolding = async (
  data: AddHoldingRequest,
  navigate: (path: string) => void 
): Promise<AddHoldingResponse> => {
  try {
    const storedUser = localStorage.getItem("user");

    let token = "";
    let userId = "";
    if (storedUser) {
      const user = JSON.parse(storedUser);
      token = user.authToken;
      userId = user.id;
      
    }
    
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const response = await axios.post<AddHoldingResponse>(
      `${API_BASE_URL}/api/holdings/${userId}/new-holding`,
      data,
      config
    );

    return {
      success: response.data.success,
      message: response.data.message,
      holdingInfo: response.data.holdingInfo,
    };
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 403) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("user");
        navigate("/login"); // Use the passed navigate function
        return {
          success: false,
          message: "Session expired. Please log in again.",
          holdingInfo: null,
        };
      }

      console.error("Error sending request:", error.response.data);
      toast.error(error.response.data.message || "An error occurred while adding the holding.");
      return {
        success: false,
        message: error.response.data.message || "An error occurred while adding the holding.",
        holdingInfo: null,
      };
    } else if (error.request) {
      console.error("No response received:", error.request);
      toast.error("No response from the server. Please try again.");
      return {
        success: false,
        message: "No response from the server.",
        holdingInfo: null,
      };
    } else {
      console.error("Error:", error.message);
      toast.error("An error occurred. Please try again.");
      return {
        success: false,
        message: "An error occurred.",
        holdingInfo: null,
      };
    }
  }
};


export const getAllHoldings = async (
  
  navigate: (path: string) => void 
): Promise<getAllHoldingsResult> => {
  try {
    const storedUser = localStorage.getItem("user");

    let token = "";
    let userId = "";
    if (storedUser) {
      const user = JSON.parse(storedUser);
      token = user.authToken;
      userId = user.id;
      
    }
    

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const response = await axios.get<getAllHoldingsResult>(
      `${API_BASE_URL}/api/holdings/${userId}/all-holdings`,
      
      config
    );

    return {
      success: response.data.success,
      message: response.data.message,
      holdings: response.data.holdings
    };
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 403) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("user");
        navigate("/login"); // Use the passed navigate function
        return {
          success: false,
          message: "Session expired. Please log in again.",
          holdings: null,
        };
      }

      console.error("Error sending request:", error.response.data);
      toast.error(error.response.data.message || "An error occurred while adding the holding.");
      return {
        success: false,
        message: error.response.data.message || "An error occurred while adding the holding.",
        holdings: null,
      };
    } else if (error.request) {
      console.error("No response received:", error.request);
      toast.error("No response from the server. Please try again.");
      return {
        success: false,
        message: "No response from the server.",
        holdings: null,
      };
    } else {
      console.error("Error:", error.message);
      toast.error("An error occurred. Please try again.");
      return {
        success: false,
        message: "An error occurred.",
        holdings: null,
      };
    }
  }
};


export const updateAssetPrice = async (
  navigate: (path: string) => void,
  holdingId: string, 
  newPrice: number 
): Promise<any> => { 
  try {
    const storedUser = localStorage.getItem('user');
    let token = '';
    let userId = '';

    if (storedUser) {
      const user = JSON.parse(storedUser);
      token = user.authToken;
      userId = user.id;
    }

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    
    const updateData = {
      currentPrice: newPrice,  
    };

    
    const response = await axios.put(
      `${API_BASE_URL}/api/holdings/${userId}/${holdingId}`, // Using PUT request to update
      updateData,
      config
    );

    // Check if the response is successful and contains holding data
    if (response.data.success) {
      toast.success("Asset price updated successfully!");
      return {
        success: true,
        message: response.data.message,
        holding: response.data.holding,  
      };
    } else {
      toast.error(response.data.message || 'Failed to update asset price.');
      return {
        success: false,
        message: response.data.message || 'Failed to update asset price.',
        holding: null,
      };
    }
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      if (error.response.status === 403) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('user');
        navigate('/login');
        return {
          success: false,
          message: 'Session expired. Please log in again.',
          holding: null,
        };
      }

      
      return {
        success: false,
        message: error.response.data.message || 'An error occurred while updating the asset price.',
        holding: null,
      };
    } else if (error.request) {
      toast.error('No response from the server. Please try again.');
      return {
        success: false,
        message: 'No response from the server.',
        holding: null,
      };
    } else {
      toast.error('An error occurred. Please try again.');
      return {
        success: false,
        message: 'An error occurred.',
        holding: null,
      };
    }
  }
};

export const performSquareoff  = async (
  navigate: (path: string) => void,
  holdingId: string,
   
): Promise<any> => { 
  try {
    const storedUser = localStorage.getItem('user');
    let token = '';
    let userId = '';

    if (storedUser) {
      const user = JSON.parse(storedUser);
      token = user.authToken;
      userId = user.id;
    }

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    
    const response = await axios.delete(
      `${API_BASE_URL}/api/holdings/${userId}/${holdingId}`, 
     
      config
    );

    
    if (response.data.success) {
      
      return {
        success: true,
        message: response.data.message,
        holding: response.data.holding,  
      };
    } else {
      
      return {
        success: false,
        message: response.data.message || 'Failed to delete asset price.',
       
      };
    }
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      if (error.response.status === 403) {
    
        localStorage.removeItem('user');
        navigate('/login');
        return {
          success: false,
          message: 'Session expired. Please log in again.',
          
        };
      }

      return {
        success: false,
        message: error.response.data.message || 'An error occurred while updating the asset price.',
     
      };
    } else if (error.request) {
     
      return {
        success: false,
        message: 'No response from the server.',
     
      };
    } else {
     
      return {
        success: false,
        message: 'An error occurred.',
     
      };
    }
  }
};


export const getOverview = async (
  
  navigate: (path: string) => void 
): Promise<HoldingsOverviewResponse> => {
  try {
    const storedUser = localStorage.getItem("user");

    let token = "";
    let userId = "";
    if (storedUser) {
      const user = JSON.parse(storedUser);
      token = user.authToken;
      userId = user.id;
      
    }
    

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const response = await axios.get<HoldingsOverviewResponse>(
      `${API_BASE_URL}/api/holdings/${userId}/overview`,
      
      config
    );

    return {
      success: response.data.success,
      message: response.data.message,
      totalInvestment: response.data.totalInvestment,
      currentInvestmentValue: response.data.currentInvestmentValue,
      totalProfit: response.data.totalProfit,
      totalLoss: response.data.totalLoss
    };
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 403) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("user");
        navigate("/login"); // Use the passed navigate function
        return {
          success: false,
          message: "Session expired. Please log in again.",
          totalInvestment: 0,
          currentInvestmentValue: 0,
          totalProfit: 0,
          totalLoss:0
        };
      }

      console.error("Error sending request:", error.response.data);
      toast.error(error.response.data.message || "An error occurred while getting overview the holding.");
      return {
        success: false,
        message: error.response.data.message || "An error occurred while getting overview the holding.",
        totalInvestment: 0,
        currentInvestmentValue: 0,
        totalProfit: 0,
        totalLoss:0
      };
    } else if (error.request) {
      console.error("No response received:", error.request);
      toast.error("No response from the server. Please try again.");
      return {
        success: false,
        message: "No response from the server.",
        totalInvestment: 0,
        currentInvestmentValue: 0,
        totalProfit: 0,
        totalLoss:0
      };
    } else {
      console.error("Error:", error.message);
      toast.error("An error occurred. Please try again.");
      return {
        success: false,
        message: "An error occurred.",
        totalInvestment: 0,
        currentInvestmentValue: 0,
        totalProfit: 0,
        totalLoss:0
      };
    }
  }
};


export const chartAnalyticsData = async (
  
  navigate: (path: string) => void 
): Promise<chartDataResponse> => {
  try {
    const storedUser = localStorage.getItem("user");

    let token = "";
    let userId = "";
    if (storedUser) {
      const user = JSON.parse(storedUser);
      token = user.authToken;
      userId = user.id;
      
    }
    

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const response = await axios.get<chartDataResponse>(
      `${API_BASE_URL}/api/holdings/${userId}/chartdata`,
      
      config
    );

    return {
      success: response.data.success,
      message: response.data.message,
      holdings: response.data.holdings
    };
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 403) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("user");
        navigate("/login"); // Use the passed navigate function
        return {
          success: false,
          message: "Session expired. Please log in again.",
          holdings: null,
        };
      }

      console.error("Error sending request:", error.response.data);
      toast.error(error.response.data.message || "An error occurred while getting chartdata the holding.");
      return {
        success: false,
        message: error.response.data.message || "An error occurred while getting chartdata the holding.",
        holdings: null
      };
    } else if (error.request) {
      console.error("No response received:", error.request);
      toast.error("No response from the server. Please try again.");
      return {
        success: false,
        message: "No response from the server.",
        holdings: null
      };
    } else {
      console.error("Error:", error.message);
      toast.error("An error occurred. Please try again.");
      return {
        success: false,
        message: "An error occurred.",
        holdings: null
      };
    }
  }
};