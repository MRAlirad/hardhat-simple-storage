//* imports
const { ethers } = require('hardhat');

const main = async () => {
	const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
	console.log('Deploying Contract ...');
	const simpleStorage = await SimpleStorageFactory.deploy();
    console.log(`Deployed contract to: ${await simpleStorage.getAddress()}`);
};

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.log(error);
		process.exit(1);
	});
