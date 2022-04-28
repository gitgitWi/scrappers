export type Market = "domestic" | "overseas";
export type SubMarket = "" | "kospi" | "kosdaq" | "dow" | "nasdaq";
export type MapPeriod = "day" | "monthly";
export type CandleChartPeriod = "day" | "week" | "month" | "quarter" | "year";

export interface Stock {
  name: string;
  stockName: string;
  stockCode: string;
  description: string;
  value: number;
  priceChange: number;
  fluctuationRate: number;
  currentPrice: number;
  tradingVolume: number;
  marketCap: number;
}

export interface Sector {
  name: string;
  industryId: number;
  industryName: string;
  children: Stock[];
}

export interface StockMap {
  children: Sector[];
}

export interface DateTimePeriodsOption {
  startDateTime: string;
  endDateTime: string;
}

export interface StockPrice {
  localDate: string;
  closePrice: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  accumulatedTradingVolume: number;
  foreignRetentionRate: number;
}
