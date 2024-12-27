import { AddTradeResult, AllTradesResult, chartDataResponseofTrades, TradesOverviewResponse, TradeType } from "@/types";
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const addTrade = async (
  data: TradeType,
  navigate: (path: string) => void 
): Promise<AddTradeResult> => {
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

    const response = await axios.post<AddTradeResult>(
      `${API_BASE_URL}/api/trades/${userId}/add-trade`,
      data,
      config
    );

    return {
      success: response.data.success,
      message: response.data.message,
      tradeInfo: response.data.tradeInfo,
    };
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 403) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("user");
        navigate("/login"); 
        return {
          success: false,
          message: "Session expired. Please log in again.",
          tradeInfo: null,
        };
      }

      console.error("Error sending request:", error.response.data);
      toast.error(error.response.data.message || "An error occurred while adding the holding.");
      return {
        success: false,
        message: error.response.data.message || "An error occurred while adding the holding.",
        tradeInfo: null,
      };
    } else if (error.request) {
      console.error("No response received:", error.request);
      toast.error("No response from the server. Please try again.");
      return {
        success: false,
        message: "No response from the server.",
        tradeInfo: null,
      };
    } else {
      console.error("Error:", error.message);
      toast.error("An error occurred. Please try again.");
      return {
        success: false,
        message: "An error occurred.",
        tradeInfo: null,
      };
    }
  }
};

export const getAllTrades = async (
  
    navigate: (path: string) => void 
  ): Promise<AllTradesResult> => {
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
  
      const response = await axios.get<AllTradesResult>(
        `${API_BASE_URL}/api/trades/${userId}/all-trades`,
        
        config
      );
  
      return {
        success: response.data.success,
        message: response.data.message,
        trades: response.data.trades
      };
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 403) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("user");
          navigate("/login"); 
          return {
            success: false,
            message: "Session expired. Please log in again.",
            trades: null,
          };
        }
  
        console.error("Error sending request:", error.response.data);
        toast.error(error.response.data.message || "An error occurred while adding the holding.");
        return {
          success: false,
          message: error.response.data.message || "An error occurred while adding the holding.",
          trades: null,
        };
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from the server. Please try again.");
        return {
          success: false,
          message: "No response from the server.",
          trades: null,
        };
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again.");
        return {
          success: false,
          message: "An error occurred.",
          trades: null,
        };
      }
    }
  };

  export const updateAssetExitPrice = async (
    navigate: (path: string) => void,
    tradeId: string, 
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
        exitPrice: newPrice,  
      };
    
      const response = await axios.put(
        `${API_BASE_URL}/api/trades/${userId}/${tradeId}`, 
        updateData,
        config
      );
    
      if (response.data.success) {
        toast.success("Asset price updated successfully!");
        return {
          success: true,
          message: response.data.message,
          tradeInfo: response.data.trade,  
        };
      } else {
        toast.error(response.data.message || 'Failed to update asset price.');
        return {
          success: false,
          message: response.data.message || 'Failed to update asset price.',
          trade: null,
        };
      }
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        const errorMessage = error.response?.data?.message || 'An error occurred while updating the asset price.';
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
          message: errorMessage,
          tradeInfo: null,
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
  

  export const performSquareoffTrade  = async (
    navigate: (path: string) => void,
    tradeId: string,
     
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
        `${API_BASE_URL}/api/trades/${userId}/${tradeId}`, 
       
        config
      );
  
      
      if (response.data.success) {
        
        return {
          success: true,
          message: response.data.message,
          trade: response.data.trade,  
        };
      } else {
        
        return {
          success: false,
          message: response.data.message || 'Failed to delete asset .',
         
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


  export const getOverviewofTrades = async (
  
    navigate: (path: string) => void 
  ): Promise<TradesOverviewResponse> => {
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
  
      const response = await axios.get<TradesOverviewResponse>(
        `${API_BASE_URL}/api/trades/${userId}/overview`,
        
        config
      );
  
      return {
        success: response.data.success,
        message: response.data.message,
        totalTradedVal: response.data.totalTradedVal,
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
            totalTradedVal: 0,
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
          totalTradedVal: 0,
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
          totalTradedVal: 0,
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
          totalTradedVal: 0,
          currentInvestmentValue: 0,
          totalProfit: 0,
          totalLoss:0
        };
      }
    }
  };
  
  
  export const chartAnalyticsDataofTrades = async (
    
    navigate: (path: string) => void 
  ): Promise<chartDataResponseofTrades> => {
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
  
      const response = await axios.get<chartDataResponseofTrades>(
        `${API_BASE_URL}/api/trades/${userId}/chartdata`,
        
        config
      );
  
      return {
        success: response.data.success,
        message: response.data.message,
        trades: response.data.trades
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
            trades: null,
          };
        }
  
        console.error("Error sending request:", error.response.data);
        toast.error(error.response.data.message || "An error occurred while getting chartdata the trade.");
        return {
          success: false,
          message: error.response.data.message || "An error occurred while getting chartdata the trade.",
          trades: null
        };
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from the server. Please try again.");
        return {
          success: false,
          message: "No response from the server.",
          trades: null
        };
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again.");
        return {
          success: false,
          message: "An error occurred.",
          trades: null
        };
      }
    }
  };
