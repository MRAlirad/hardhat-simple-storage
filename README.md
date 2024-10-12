# Hardhat

## Hardhat Development Environment

[`Hardhat`](https://hardhat.org/) is a development environment for Ethereum software

Flexible JavaScript based development environment to copile, deploy, test adn debug EVM based smart contracts.

Enables easy integration of code and external tools

Local Hardhat etwork to simulate Ethereum

Extensible plygin features

High level of debugging features

## Hardhat Setup

to [`install hardhat`](https://hardhat.org/hardhat-runner/docs/getting-started#installation), run the command:

```bash
npm install --save-dev hardhat
```

To [`create the sample project`](https://hardhat.org/hardhat-runner/docs/getting-started#installation), run the command:

```bash
npx hardhat init
```

to access to hardhat [`global options or availabel tasks`](https://hardhat.org/hardhat-runner/docs/getting-started#running-tasks) run the the command:

```bash
npx hardhat
```

## Deploying SimpleStorage from Hardhat

to compile our contract we run the command:

```bash
npx hardhat compile
```

> rememeber to match the version of your contract with the version in `hardhat.config.js` file

Some contracts need to be linked with libraries before they are deployed. You can pass the addresses of their libraries to the [`getContractFactory`](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers#library-linking) function with an object like this

```js
const { ethers } = require('hardhat');

const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
```

and then you can use the deploy method to deploy it.

```js
const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
const simpleStorage = await SimpleStorageFactory.deploy();
```

to get the address of the deployed contract there are two ways

```js
await simpleStorage.getAddress();
simpleStorage.target;
```
