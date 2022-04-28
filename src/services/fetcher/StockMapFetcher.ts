import { URL } from "node:url";

import { Z_BASE_URL } from "../../configs";

import type { Market, SubMarket, MapPeriod, StockMap } from "./types";
import { Fetcher } from "./Fetcher";

export class StockMapFetcher extends Fetcher {
  constructor(private readonly baseUrl = Z_BASE_URL) {
    super();
  }

  public async fetchApi(
    market: Market,
    subMarket: SubMarket,
    period: MapPeriod
  ): Promise<StockMap | false> {
    return this.get<StockMap>(this.getRequestUrl(market, subMarket, period));
  }

  private getRequestUrl(
    market: Market,
    subMarket: SubMarket,
    period: MapPeriod
  ): string {
    const url = new URL(`/api/treemap/${market}/${subMarket}?`, this.baseUrl);
    url.searchParams.set("period", period);
    return url.toString();
  }
}

export const stockMapFetcher = new StockMapFetcher();
