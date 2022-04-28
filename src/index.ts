import type { Market, SubMarket, MapPeriod } from "./services";
import { sqliteRepository, stockMapFetcher } from "./services";

const pathKeys = [
  ["domestic", "kospi", "day"],
  ["domestic", "kosdaq", "day"],
  ["overseas", "dow", "day"],
  ["overseas", "nasdaq", "day"],
] as [Market, SubMarket, MapPeriod][];

(function main() {
  // sqliteRepository.delete();

  pathKeys.map(([market, subMarket, mapPeriod]) => {
    /** fetch map data */
    stockMapFetcher
      .fetchApi(market, subMarket, mapPeriod)
      .then((data) => {
        if (!data) {
          console.error(
            `data not fetched - ${market}/${subMarket}/${mapPeriod}`
          );
          return ["", {}];
        }
        return [
          `map-${market}-${subMarket}-${mapPeriod}`,
          JSON.stringify(data),
        ];
      })
      /** insert to db */
      .then(([key, value]) => {
        if (!key) return;
        sqliteRepository.insert({ key, value });
      });
  });
})();
