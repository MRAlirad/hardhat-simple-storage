//* imports
const {ethers, run, network} = require("hardhat");
// using "run" you can access your hardhat tasks => returns a promise

//* async main function
const main = async () => {
	const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
	console.log("Deploying Contract ...");
	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.getDeployedCode();
	console.log(`Deployed contract to: ${simpleStorage.target}`); //? or use "await simpleStorage.getAddress()" instead of "simpleStorage.target"
	// What happens when we deploy to our hardhat network? since hardhat is local to our machine, it does not net to be verified
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
		await run('verify:verify', { // the second verify is the parameter you pass to the verify task function
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (error) {
		if (error.message.toLowerCase().includes("already verified"))
			console.log('Already Verified');
		else
			console.log(error);
	}
};

//* call main function
main()
	.then(() => {
		process.exit(0);
	}).catch((error) => {
		console.log(error);
		process.exit(1);
	})
	;





// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = hre.ethers.parseEther("0.001");

//   const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   await lock.waitForDeployment();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
