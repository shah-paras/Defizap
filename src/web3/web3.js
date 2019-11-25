import Onboard from 'bnc-onboard';
import Web3 from 'web3';

// eslint-disable-next-line import/no-mutable-exports
let web3;

const FORTMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY;
const PORTIS_KEY = process.env.REACT_APP_PORTIS_KEY;
const SQUARELINK_KEY = process.env.REACT_APP_SQUARELINK_KEY;
const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;

const wallets = [
  { walletName: 'coinbase', preferred: true },
  { walletName: 'trust', preferred: true },
  { walletName: 'metamask', preferred: true },
  { walletName: 'dapper', preferred: true },
  {
    walletName: 'fortmatic',
    apiKey: FORTMATIC_KEY,
    preferred: true
  },
  {
    walletName: 'portis',
    apiKey: PORTIS_KEY,
    preferred: true
  },
  {
    walletName: 'squarelink',
    apiKey: SQUARELINK_KEY
  },
  { walletName: 'authereum' },
  {
    walletName: 'walletConnect',
    infuraKey: INFURA_KEY
  }
];

const initializationOptions = {
  dappId: process.env.REACT_APP_BLOCKNATIVE_ID,
  networkId: 1,
  darkMode: true,
  subscriptions: {
    wallet: wallet => {
      web3 = new Web3(wallet.provider);
    }
  },
  walletSelect: {
    wallets
  }
};

const onboard = Onboard(initializationOptions);

export { onboard, web3 };
