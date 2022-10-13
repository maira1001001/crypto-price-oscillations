import { Api } from './types/api';
import { Ticker } from './types/oscillation';

function getTickerForCurrencyPair(api: Api) {
  return async function (currencyPair: string): Promise<Ticker | undefined> {
    return currencyPair == ''
      ? undefined
      : await api.getTickerByPair(currencyPair);
  };
}

function isAnOscillation(
  spreadA: number, // spreadA or spreadB could be 'ask' or 'bid'
  spreadB: number,
  percentageOfOscillation: number
): boolean {
  return percentageOfSpread(spreadA, spreadB) >= percentageOfOscillation;
}

function percentageOfSpread(spreadA: number, spreadB: number): number {
  return (Math.abs(spreadA - spreadB) / spreadA) * 100;
}

function messageAlertingOscillation(
  spreadA: number, // spreadA or spreadB could be 'ask' or 'bid'
  spreadB: number,
  percentageOfOscillation: number,
  currencyPair: string,
  spreadType: string
): string {
  return `${spreadType} price is going ${downOrUp(
    spreadA,
    spreadB
  )} for ${currencyPair} in ${percentageOfSpread(spreadA, spreadB).toFixed(
    3
  )}%`;
}

function downOrUp(spreadA: number, spreadB: number): string {
  return spreadA - spreadB > 0 ? '↓ down' : '↑ up';
}

export {
  getTickerForCurrencyPair,
  isAnOscillation,
  percentageOfSpread,
  messageAlertingOscillation
};
