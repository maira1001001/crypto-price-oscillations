import { Ticker } from './oscillation';

export interface Api {
  getTickerByPair(currencyPair: string): Promise<Ticker | undefined>;
}
