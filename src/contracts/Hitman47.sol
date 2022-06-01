pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Hitman47 is ERC721URIStorage {
    address payable public owner ;
    uint256 public initialMintingCost = 0 ; //0 tokens
    uint256 internal count = 0 ;

    constructor() ERC721("Hitman NFT", "HITMAN") public {
        owner = payable(msg.sender);
    }

    function mint(address market, string memory tokenURI) public returns (uint256) {
        require(owner == msg.sender);
        count += 1 ;
        uint256 newItemId = count;
        _mint(owner, newItemId);
        _setTokenURI(newItemId, tokenURI);
        approve(market , newItemId);
        return newItemId;
    }

    function totalSupplyy() external view returns (uint256) {
      return count;
    }





}