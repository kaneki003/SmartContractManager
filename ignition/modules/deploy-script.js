const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  //Wallet making used in deploying and interacting with the contract
  const url = process.env.SEPOLIA_RPC_URL;
  if (!url) {
    throw new Error("SEPOLIA_RPC_URL not set in .env file");
  }
  const provider = new ethers.providers.JsonRpcProvider(url);
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY not set in .env file");
  }
  const wallet = new ethers.Wallet(privateKey, provider);

  // Creating a contract instance which requires an EOA(signer/wallet of owner) which is deploying the contract and abi,bytecode of the contract
  const artifacts = await hre.artifacts.readArtifact("Interact");
  const contractFactory = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );

  // Deploying the contract
  const contract = await contractFactory.deploy();
  await contract.deployed();

  //Fetching the address of the deployed contract
  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
