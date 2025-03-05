// user-api.ts

export type SendOTPRequest = {
    name: string;
    email: string;
    useCase: string;
    isLogin: boolean;
  };


export type SendOTPResult = {
  success: boolean;
  message: string; 
  
};

export type VerifyOTPResult = {
  success: boolean;
  message: string; 
}
  
export  type VerifyOTPRequest = {
    email: string;
    otp: any;
    isBanAllowed: boolean;
  };
  
export type RegisterUserRequest = {
    name: string;
    email: string;
    password: string;
};

export type RegisterUserResult = {
  success: boolean;
  message: string;
  user: any;
}
  

export type LoginUserRequest = {
  email: string;
  password: string;
}

export type LoginUserResult = {
  success: boolean;
  message: string;
  token:string;
  user: any;
}


//holding-api.ts

export type AddHoldingRequest = {
  assetName: string;
  quantity: number;
  boughtPrice: number;
  currentPrice: number;
  date: string;
}

export type AddHoldingResponse = {
  success: boolean;
  message: string;
  holdingInfo: any;
}

export type getAllHoldingsResult  = {
  success: boolean,
  message: string,
  holdings: any
}

export type OrderStatus =
    | "hold"
    | "squareoff";


export type Holding =  {
  success: boolean,
  message: string,
  holding: any
}


export type HoldingsOverviewResponse = {
  success: boolean,
  message: string,

  totalInvestment: number,
  currentInvestmentValue: number,
  totalProfit : number,
  totalLoss : number,
}

export type chartDataResponse = {
  success: boolean,
  message: string,

  holdings: any
}


// trades-api.ts

export type TradeType = {
  assetName: string;
  quantity: number;
  assetType: string;
  tradeType: string;
  tradeCategory: string;
  enterPrice: number;
  stopLoss: number;
  exitPrice: number;
  strategyName: string;
  strategyDescription: string;
  date: string;

}

export type AddTradeResult = {
  success: boolean;
  message: string;
  tradeInfo: any;
}

export type AllTradesResult = {
  success: boolean,
  message: string,
  trades: any
}

// journal-api.ts

export type AllJournals = {
  success: boolean,
  message: string,
  journals: any
}

export type addJournalRequest = {
    assetName: string, 
    journalFor: string,  
    assetType: string, 
    quantity: number,
    enterPrice: number, 
    stopLoss : number, 
    exitPrice: number, 
    tradeCategory: string, 
    date: string, 
    strategyName: string, 
    strategyDescription: string
}

export type addJournalResponse = {
  success: boolean,
  message: string,
  journal: any
}

export type TradesOverviewResponse = {
  success: boolean,
  message: string,

  totalTradedVal: number,
  currentInvestmentValue: number,
  totalProfit: number,
  totalLoss: number,
}

export type chartDataResponseofTrades = {
  success: boolean,
  message: string,

  trades: any
}

export type chartDataResponseofJournals = {
  success: boolean,
  message: string,

  journals: any
}