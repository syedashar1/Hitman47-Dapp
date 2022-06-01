const Hitman47 = artifacts.require("Hitman47");
const HitmanToken = artifacts.require("HitmanToken");
const NFT = artifacts.require('NFT');
const Market = artifacts.require('Market');
// module.exports = async function(deployer)  {
//   await deployer.deploy(HitmanToken);
//   await deployer.deploy(Hitman47);
//   await deployer.deploy(Hitman47);
//   await deployer.deploy(Hitman47);
// };

module.exports = async function(deployer, network, accounts) {
  // Deploy Hitman Token
  // await deployer.deploy(HitmanToken)
  // const hitmanToken = await HitmanToken.deployed()

  // // Deploy TokenFarm
  // await deployer.deploy(Hitman47, hitmanToken.address)
  // const hitman47 = await Hitman47.deployed()

  // // Transfer all tokens to TokenFarm (47k)
  // await hitmanToken.transfer(hitman47.address, '100000000000000000000000')


  deployer.deploy(Hitman47);
	deployer.deploy(Market);


  

}