require("@nomicfoundation/hardhat-toolbox");

// the first argument is the name of the task and the second one is the description of it.
task("block-number", "Prints the current block number")
    .setAction(async (taskArgs, hre) => {
        // hre => hardhat runtime environment (https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment)
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number: ${blockNumber}`);
    })
    ;