import Onboard from 'bnc-onboard';
import Web3 from 'web3';

// eslint-disable-next-line import/no-mutable-exports
let web3;

const initializationOptions = {
  dappId: process.env.REACT_APP_BLOCKNATIVE_ID,
  networkId: 1,
  darkMode: true,
  subscriptions: {
    wallet: wallet => {
      web3 = new Web3(wallet.provider);
    }
  }
};

const onboard = Onboard(initializationOptions);

export { onboard, web3 };
