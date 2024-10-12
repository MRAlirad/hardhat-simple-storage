//* imports
const { ethers, run, network } = require('hardhat');
// using "run" you can access your hardhat tasks => returns a promise

const main = async () => {
	const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
	console.log('Deploying Contract ...');
	const simpleStorage = await SimpleStorageFactory.deploy();
	console.log(`Deployed contract to: ${await simpleStorage.getAddress()}`);

	// we only want to verify on sepolia testnet
	if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
		console.log('Verifying contract on Etherscan...');
		// we wait 6 blocks and then we run our verification process.
		await simpleStorage.deploymentTransaction().wait(6);
		await verify(simpleStorage.target, []);
	}

	// intracting with contract
	const currentValue = await simpleStorage.retrieve();
	console.log(`Current value is: ${currentValue}`);

	// Update the current value
	const transacitonResponse = await simpleStorage.store(42);
	await transacitonResponse.wait(1);
	const updatedValue = await simpleStorage.retrieve();
	console.log(`Updated value is: ${updatedValue}`);
};

const verify = async (contractAddress, args) => {
	console.log('Verifying contract...');
	try {
		await run('verify:verify', {
			// the second verify is the parameter you pass to the verify task function
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (error) {
		if (error.message.toLowerCase().includes('already verified')) console.log('Already Verified');
		else console.log(error);
	}
};

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.log(error);
		process.exit(1);
	});
