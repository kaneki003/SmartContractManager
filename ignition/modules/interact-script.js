const { ethers } = require("hardhat");
require("dotenv").config();

// Address and abi of the deployed contract with which interaction is done
const address = process.env.INTERACTION_CONTRACT_ADDRESS;
const abi = require("../../artifacts/contracts/Interact.sol/Interact.json").abi;

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

  const contract = await new hre.ethers.Contract(address, abi, wallet);

  //Interating with the contract where normal function call is made as in class.functionName(parameters)
  let tx = await contract.winner(process.env.ADDRESS_PARAMETER);
  await tx.wait();

  //Fetching the status of interaction
  console.log("Contract interacted:", tx);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
