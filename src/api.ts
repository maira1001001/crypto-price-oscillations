import axios from 'axios';
import { Ticker } from './types/oscillation';

async function getTickerByPair(
  currencyPair: string
): Promise<Ticker | undefined> {
  try {
    const { data } = await axios.get<Ticker>(
      `https://api.uphold.com/v0/ticker/${currencyPair}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    return data;
  } catch (err) {
    return undefined;
  }
}

const api = { getTickerByPair };
export default api;
