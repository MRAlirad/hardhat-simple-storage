const { ethers } = require('hardhat');
const { expect, assert } = require('chai');

describe('simpleStorage', () => {
	let simpleStorageFactory, simpleStorage;

	// this function calls before each of our test functions
	beforeEach(async () => {
		simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
		simpleStorage = await simpleStorageFactory.deploy();
	});

	it('Should start with a favorite number of 0', async () => {
		const currentValue = await simpleStorage.retrieve();
		const expectedValue = '0';

		assert.equal(currentValue.toString(), expectedValue);
		// or
		expect(currentValue.toString()).to.equal(expectedValue)
	});
	it('Should update when we call store', async () => {
		const expectedValue = '7';
		const transactionResponse = await simpleStorage.store(expectedValue);
		await transactionResponse.wait(1);

		const currentValue = await simpleStorage.retrieve();
		assert.equal(currentValue.toString(), expectedValue);
	});

	// it.only('exoample, ()=> {}); //?becase of 'only' keywork only this it will be tested
});
