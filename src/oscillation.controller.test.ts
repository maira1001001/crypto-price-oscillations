import { expect } from 'chai';
import {
  getTickerForCurrencyPair,
  isAnOscillation,
  messageAlertingOscillation,
  percentageOfSpread
} from './oscillation.controller';

import { Ticker } from './types/oscillation';

const currencyPair = 'BTC-EUR'; // TODO: check if I can define a string with a regular expresion
const tickerA: Ticker = {
  ask: 1.03149430184,
  bid: 1.03110900005,
  currency: 'EUR'
};
const tickerB: Ticker = {
  ask: 1.031219271225,
  bid: 1.030834000039,
  currency: 'EUR'
};
const percentageOfOscillation = 0.01;

describe('Get ticker for currency pair - Unit testing', () => {
  // precondition: puede llegar string vacio?
  it('Should return a ticker for a valid currency pair', async () => {
    const api = {
      getTickerByPair: (currencyPair: string): Promise<Ticker> =>
        Promise.resolve(tickerA)
    };
    expect(await getTickerForCurrencyPair(api)(currencyPair)).to.have.property(
      'ask'
    );
    expect(await getTickerForCurrencyPair(api)(currencyPair)).to.have.property(
      'bid'
    );
    expect(await getTickerForCurrencyPair(api)(currencyPair)).to.have.property(
      'currency'
    );
  });
  it('Should return undefined for an invalid currency pair', async () => {
    const api = {
      getTickerByPair: (currencyPair: string) => Promise.resolve(undefined)
    };
    expect(await getTickerForCurrencyPair(api)('random-currency')).to.be
      .undefined;
  });
});

describe('Is an Oscillation - Unit testing', () => {
  it('should return true when there is an oscillation', () => {
    expect(isAnOscillation(tickerA.ask, tickerB.ask, percentageOfOscillation))
      .to.be.true;
  });
  it('should return false when there is not an oscillation', () => {
    expect(isAnOscillation(tickerB.ask, tickerB.ask, percentageOfOscillation))
      .to.be.false;
  });
});

describe('Message Alerting Oscillation - Unit testing', () => {
  it('should return a positive message when price goes up', () => {
    expect(
      messageAlertingOscillation(
        tickerB.bid,
        tickerA.bid,
        percentageOfOscillation,
        currencyPair,
        'bid'
      )
    ).to.be.equal(
      `bid price is going ↑ up for ${currencyPair} in ${percentageOfSpread(
        tickerA.bid,
        tickerB.bid
      ).toFixed(3)}%`
    );
  });
  it('should return a negative message when price goes down', () => {
    expect(
      messageAlertingOscillation(
        tickerA.ask,
        tickerB.ask,
        percentageOfOscillation,
        currencyPair,
        'ask'
      )
    ).to.be.equal(
      `ask price is going ↓ down for ${currencyPair} in ${percentageOfSpread(
        tickerA.ask,
        tickerB.ask
      ).toFixed(3)}%`
    );
  });
});
