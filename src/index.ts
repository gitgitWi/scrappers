import {
  sqliteRepository,
  stockSelector,
  stockPricesFetcher,
  stockMapFetcher,
  type Market,
  type SubMarket,
  type MapPeriod,
  type StockPrice,
  type CandleChartPeriod,
} from "./services";

import { sleep } from "./utils/timer";

(async function main() {
  /** 초기화 */
  sqliteRepository.delete();

  const keys: [Market, SubMarket, MapPeriod][] = [
    ["domestic", "kospi", "day"],
    ["domestic", "kosdaq", "day"],
  ];

  for await (const [market, subMarket, period] of keys) {
    const data = await stockMapFetcher.fetchApi(market, subMarket, period);
    if (!data) continue;

    sqliteRepository.insert({
      key: `map-${market}-${subMarket}-${period}`,
      value: JSON.stringify(data),
    });
  }

  /** 국내 주식 상위 100개 종목 코드 추출 */
  const krTopStocks = stockSelector.takeKrTopStockData();
  sqliteRepository.insert({
    key: `stocks-domestic`,
    value: JSON.stringify({
      stocks: krTopStocks,
    }),
  });
  const krTopStockCodes = krTopStocks.map((d) => d.stockCode);

  console.log({ topCodes: krTopStockCodes.length });

  /** 국내 주식 데이터 가져오기 */
  console.time(`fetchAll`);

  const market: Market = "domestic";
  const period: CandleChartPeriod = "day";

  const dateTimes = [
    { startDateTime: "202107130000", endDateTime: "202204282330" },
    { startDateTime: "202103150000", endDateTime: "202107130000" },
  ];

  dateTimes.forEach(async ({ startDateTime, endDateTime }) => {
    for await (const code of krTopStockCodes) {
      const key = `prices-${market}-${code}-${period}-${startDateTime}-${endDateTime}`;
      const stockPrices = await stockPricesFetcher.fetchApi<StockPrice[]>(
        market,
        code,
        period,
        {
          startDateTime,
          endDateTime,
        }
      );

      if (!stockPrices) {
        console.error(`data fetch failed - ${key}`);
        return;
      }

      /** sqlite에 데이터 저장 */
      sqliteRepository.insert({
        key,
        value: JSON.stringify(stockPrices),
      });

      console.info(`data saved - ${key}`);
      await sleep(0.5);
    }
  });

  console.timeEnd(`fetchAll`);
})();
