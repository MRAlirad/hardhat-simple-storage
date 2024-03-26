require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require('@nomicfoundation/hardhat-verify');
require('./tasks/block-number'); // when you require the task in here, it will automatically added to hardhat tasks
require('hardhat-gas-reporter'); // require hardhat-gas-reporter plugin
require('solidity-coverage');

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || '';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const COINMARKEYCAP_API_KEY = process.env.COINMARKEYCAP_API_KEY || '';

// you can also add thask in here without put it in separete single file. but it is not a good practice.
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();
	for (const account of accounts)
		console.log(account.address);
});

module.exports = {
	defualtNetwork: 'hardhat',
	networks: {
		sepolia: {
			url: SEPOLIA_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 11155111,
		},
		localhost: {
			url: "http://127.0.0.1:8545/", // the given url by inserting 'hardhat yarn node' in terminal
			chainId: 31337, // the chain id of the local network is the same as hardhat
			// acounts is not needed because the localhost gives us the accounts
		}
	},
	solidity: "0.8.24",
	etherscan: {
		apiKey: ETHERSCAN_API_KEY, // used for verification by hardhat-verify through etherscan
	},
	//  config the gas reporter
	gasReporter: {
		enabled: true, // to show the gas reporter in your terminal
		outputFile: 'gas-reporter.txt', // to output the gas reporter in to a .txt file
		noColors: true,
		currency: 'USD',
		coinmarketcap: COINMARKEYCAP_API_KEY, // the API given from https://coinmarketcap.com
		token: 'MATIC' // to deploy in diffrent network
	}
};
