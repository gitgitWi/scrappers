import { URL } from "node:url";

import { N_BASE_URL } from "../../configs";

import type { Market, CandleChartPeriod, DateTimePeriodsOption } from "./types";
import { Fetcher } from "./Fetcher";

export class StockPricesFetcher extends Fetcher {
  constructor(private readonly baseUrl = N_BASE_URL) {
    super();
  }

  public async fetchApi<T>(
    market: Market,
    stockCode: string,
    period: CandleChartPeriod = "day",
    dateTimePeriods: DateTimePeriodsOption = {
      startDateTime: "202107120000",
      endDateTime: this.getDateTimeNumber(),
    }
  ): Promise<T | false> {
    return this.get<T>(
      this.getRequestUrl(market, stockCode, period, dateTimePeriods)
    );
  }

  private getRequestUrl(
    market: Market,
    stockCode: string,
    period: CandleChartPeriod,
    { startDateTime, endDateTime }: DateTimePeriodsOption
  ): string {
    const url = new URL(
      `/chart/${market}/item/${stockCode}/${period}`,
      this.baseUrl
    );
    url.searchParams.set("startDateTime", startDateTime);
    url.searchParams.set("endDateTime", endDateTime);
    return url.toString();
  }

  private getDateTimeNumber(date = new Date()): string {
    return `${date.getFullYear()}${
      date.getMonth() + 1
    }${date.getDate()}${date.getHours()}${date.getMinutes()}`;
  }
}

export const stockPricesFetcher = new StockPricesFetcher();
