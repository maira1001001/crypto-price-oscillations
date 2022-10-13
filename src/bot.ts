import {
  getTickerForCurrencyPair,
  isAnOscillation,
  percentageOfSpread,
  messageAlertingOscillation
} from './oscillation.controller';
import { Ticker } from './types/oscillation';
import api from './api';

async function calculatePriceOScillations(
  currencyPair: string,
  secondsBetweenOScillations: number,
  percentageOfOscillation: number
): Promise<void> {
  const firstTicker: Ticker | undefined = await getTickerForCurrencyPair(api)(
    currencyPair
  );
  if (!firstTicker) console.log(`The currency pair ${currencyPair} is invalid`);
  else {
    //wait 5 seconds to query the API again
    let tickerA = firstTicker;
    setInterval(async () => {
      const tickerB: Ticker | undefined = await getTickerForCurrencyPair(api)(
        currencyPair
      );
      if (!tickerB) {
        console.log(`Error quering the API...`);
      } else {
        const tickerC: Ticker = tickerB;
        if (
          isAnOscillation(tickerA.ask, tickerC.ask, percentageOfOscillation)
        ) {
          console.log(
            messageAlertingOscillation(
              tickerA.ask,
              tickerB.ask,
              percentageOfOscillation,
              currencyPair,
              'ask'
            )
          );
        }
        if (
          isAnOscillation(tickerA.bid, tickerC.bid, percentageOfOscillation)
        ) {
          console.log(
            messageAlertingOscillation(
              tickerA.bid,
              tickerB.bid,
              percentageOfOscillation,
              currencyPair,
              'bid'
            )
          );
        }
        tickerA = tickerB;
      }
    }, secondsBetweenOScillations * 1000);
  }
}

calculatePriceOScillations('BTC-EUR', 5, 0.01);

// export default calculatePriceOScillations;
