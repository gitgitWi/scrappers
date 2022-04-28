import { Market, SubMarket, MapPeriod } from "./types";

export const StockMapPathKeys = [
  ["domestic", "kospi", "day"],
  ["domestic", "kosdaq", "day"],
  ["overseas", "dow", "day"],
  ["overseas", "nasdaq", "day"],
] as [Market, SubMarket, MapPeriod][];
