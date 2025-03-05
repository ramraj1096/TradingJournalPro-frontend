import { addJournalRequest, addJournalResponse, AllJournals, chartDataResponseofJournals, TradesOverviewResponse } from "@/types";
import axios from "axios";
import { toast } from "sonner";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const getAllJournals = async (
  
    navigate: (path: string) => void 
  ): Promise<AllJournals> => {
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
  
      const response = await axios.get<AllJournals>(
        `${API_BASE_URL}/api/journals/${userId}/all-journals`,
        
        config
      );
  
      return {
        success: response.data.success,
        message: response.data.message,
        journals: response.data.journals
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
            journals: null,
          };
        }
  
        console.error("Error sending request:", error.response.data);
        toast.error(error.response.data.message || "An error occurred while getting all journals.");
        return {
          success: false,
          message: error.response.data.message || "An error occurred while getting all journals.",
          journals: null,
        };
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from the server. Please try again.");
        return {
          success: false,
          message: "No response from the server.",
          journals: null,
        };
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again.");
        return {
          success: false,
          message: "An error occurred.",
          journals: null,
        };
      }
    }
};


export const getJournal  = async (
    navigate: (path: string) => void,
    journalId: string,
     
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
  
      
      const response = await axios.get(
        `${API_BASE_URL}/api/journals/${userId}/${journalId}`, 
       
        config
      );
  
      
      if (response.data.success) {
        
        return {
          success: true,
          message: response.data.message,
          journal: response.data.journal,  
        };
      } else {
        
        return {
          success: false,
          message: response.data.message || 'Failed to get journal.',
         
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
          message: error.response.data.message || 'An error occurred while getting journal.',
       
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


export const addJournal = async (
  data: addJournalRequest,
  navigate: (path: string) => void 
): Promise<addJournalResponse> => {
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

    const response = await axios.post<addJournalResponse>(
      `${API_BASE_URL}/api/journals/${userId}/add-new`,
      data,
      config
    );

    return {
      success: response.data.success,
      message: response.data.message,
      journal: response.data.journal,
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
          journal: null,
        };
      }

      console.error("Error sending request:", error.response.data);
      toast.error(error.response.data.message || "An error occurred while adding the journal.");
      return {
        success: false,
        message: error.response.data.message || "An error occurred while adding the journal.",
        journal: null,
      };
    } else if (error.request) {
      console.error("No response received:", error.request);
      toast.error("No response from the server. Please try again.");
      return {
        success: false,
        message: "No response from the server.",
        journal: null,
      };
    } else {
      console.error("Error:", error.message);
      toast.error("An error occurred. Please try again.");
      return {
        success: false,
        message: "An error occurred.",
        journal: null,
      };
    }
  }
};

export const deleteJournal  = async (
  navigate: (path: string) => void,
  journalId: string,
   
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
      `${API_BASE_URL}/api/journals/${userId}/${journalId}`, 
     
      config
    );

    
    if (response.data.success) {
      
      return {
        success: true,
        message: response.data.message,
         
      };
    } else {
      
      return {
        success: false,
        message: response.data.message || 'Failed to delete journal.',
       
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
        message: error.response.data.message || 'An error occurred while deleting the journal.',
     
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


export const getOverviewofJournals = async (
  
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
      `${API_BASE_URL}/api/journals/${userId}/overview`,
      
      config
    );

    console.log(response)
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


export const chartAnalyticsDataofJournals = async (
  
  navigate: (path: string) => void 
): Promise<chartDataResponseofJournals> => {
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

    const response = await axios.get<chartDataResponseofJournals>(
      `${API_BASE_URL}/api/journals/${userId}/chartData`,
      
      config
    );

    return {
      success: response.data.success,
      message: response.data.message,
      journals: response.data.journals
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
          journals: [],
        };
      }

      console.error("Error sending request:", error.response.data);
      toast.error(error.response.data.message || "An error occurred while getting chartdata the trade.");
      return {
        success: false,
        message: error.response.data.message || "An error occurred while getting chartdata the trade.",
        journals: []
      };
    } else if (error.request) {
      console.error("No response received:", error.request);
      toast.error("No response from the server. Please try again.");
      return {
        success: false,
        message: "No response from the server.",
        journals: []
      };
    } else {
      console.error("Error:", error.message);
      toast.error("An error occurred. Please try again.");
      return {
        success: false,
        message: "An error occurred.",
        journals: []
      };
    }
  }
};