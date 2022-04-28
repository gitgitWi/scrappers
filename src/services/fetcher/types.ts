export type Market = "domestic" | "overseas";
export type SubMarket = "" | "kospi" | "kosdaq" | "dow" | "nasdaq";
export type MapPeriod = "day" | "monthly";

export interface StockMap {
  children: {
    name: string;
    industryId: number;
    industryName: string;
    children: any[];
  }[];
}
