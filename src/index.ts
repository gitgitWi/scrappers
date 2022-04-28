import { sqliteRepository, stockSelector } from "./services";

(function main() {
  // sqliteRepository.delete();

  /** 국내 주식 상위 100개 종목 코드 추출 */
  const krTopStockCodes = stockSelector.takeKrTopStockCodes();
  console.log({ krTopStockCodes });

  /** 국내 주식 데이터 가져오기 */

  /** sqlite에 데이터 저장 */
})();
