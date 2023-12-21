const HDWalletProvider = require('@truffle/hdwallet-provider');
const metaMaskMnemonic = 'divert blue decline laundry laugh save guess junior tobacco cabbage edge inspire';
const infuraApiKey = 'ca7d3fbc25f145f79ccc4b20a448195e'

module.exports = {

  networks: {

    development: {
      host: "127.0.0.1",  
      port: 7545,           
      network_id: "*",       
    },

    sepolia: {
      provider: () => new HDWalletProvider(metaMaskMnemonic, `https://sepolia.infura.io/v3/${infuraApiKey}`),
      network_id: 11155111,
      gas: 5500000,
      confirmations: 2, 
      timeoutBlocks: 200, 
      skipDryRun: true     
    },
  },

  compilers: {
    solc: {
      version: "0.8.19",      
    }
  },
};
