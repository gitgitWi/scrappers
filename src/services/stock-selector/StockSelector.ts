import type {
  MapPeriod,
  Market,
  Stock,
  StockMap,
  SubMarket,
} from "../../services";
import { sqliteRepository, stockMapFetcher } from "../../services";

const krStoreKeys: `map-${Market}-${SubMarket}-${MapPeriod}`[] = [
  "map-domestic-kospi-day",
  "map-domestic-kosdaq-day",
];

export class StockSelector {
  constructor(
    private readonly repository = sqliteRepository,
    private readonly fetcher = stockMapFetcher
  ) {}

  takeKrTopStockCodes(topNumber = 100): string[] {
    return this.flatStockMapsToStocks(this.getKrStockMapsFromDB())
      .sort((a, b) => b.marketCap - a.marketCap)
      .slice(0, topNumber)
      .map((d) => d.stockCode);
  }

  private getKrStockMapsFromDB(): StockMap[] {
    return krStoreKeys
      .map((key) =>
        this.repository.readById<{ key: string; value: string }>(key)
      )
      .filter((stored) => typeof stored === "object")
      .map((d) => JSON.parse(d?.value || ""));
  }

  private flatStockMapsToStocks(stockMaps: StockMap[]): Stock[] {
    return stockMaps
      .map((data) => data.children.map((sector) => sector.children))
      .flat(2);
  }
}

export const stockSelector = new StockSelector();
