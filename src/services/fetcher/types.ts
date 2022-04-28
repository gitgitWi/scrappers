export type Market = "domestic" | "overseas";
export type SubMarket = "" | "kospi" | "kosdaq" | "dow" | "nasdaq";
export type MapPeriod = "day" | "monthly";

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
