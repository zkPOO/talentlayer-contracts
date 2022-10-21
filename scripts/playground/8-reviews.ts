import { ethers } from "hardhat";
import { get, ConfigProperty } from "../../configManager";
import { Network } from "../config";
const hre = require("hardhat");

// Then Alice create a service, and others add proposals
async function main() {
  const network = await hre.network.name;
  console.log(network);

  const [alice, bob, carol, dave] = await ethers.getSigners();

  const talentLayerReview = await ethers.getContractAt(
    "TalentLayerReview",
    get(network as Network, ConfigProperty.Reviewscontract)
  );

  const platformIdContrat = await ethers.getContractAt(
    "TalentLayerPlatformID",
    get(network as Network, ConfigProperty.TalentLayerPlatformID)
  );

  const daveTalentLayerIdPlatform =
    await platformIdContrat.getPlatformIdFromAddress(dave.address);
  console.log("Dave talentLayerIdPLatform", daveTalentLayerIdPlatform);

  await talentLayerReview
    .connect(alice)
    .addReview(1, "cidReviewFromAliceToCarol", 5, daveTalentLayerIdPlatform);
  console.log("Alice reviewed Carol");
  await talentLayerReview
    .connect(carol)
    .addReview(1, "cidReviewFromCarolToAlice", 3, daveTalentLayerIdPlatform);
  console.log("Carol reviewed Alice");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});