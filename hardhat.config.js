require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
require('@nomicfoundation/hardhat-verify');
require('./tasks/block-number');
require('./tasks/accounts');
require('hardhat-gas-reporter');
require('solidity-coverage');

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || '';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const COINMARKEYCAP_API_KEY = process.env.COINMARKEYCAP_API_KEY || '';

module.exports = {
	solidity: '0.8.7',
	networks: {
		sepolia: {
			url: SEPOLIA_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 11155111,
		},
	},
	etherscan: {
		apiKey: ETHERSCAN_API_KEY, // used for verification by hardhat-verify through etherscan
	},
	gasReporter: {
		enabled: true, // to show the gas reporter in your terminal
		outputFile: 'gas-reporter.txt', // to output the gas reporter in to a .txt file
		noColors: true,
		currency: 'USD',
		coinmarketcap: COINMARKEYCAP_API_KEY, // the API given from https://coinmarketcap.com
		token: 'MATIC', // to deploy in diffrent network
	},
};
