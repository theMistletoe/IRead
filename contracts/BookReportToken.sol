pragma solidity ^0.5.2;

import "./../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract BookReportToken is ERC721Full {
    uint256 internal nextTokenId = 0;

    constructor(string memory  name, string memory symbol) ERC721Full(name, symbol) public {}

    event Mint(address owner, uint256 tokenId);

    function createBookReport(string memory tokenURI) public returns (uint256) {

        uint256 tokenId = nextTokenId;
        nextTokenId = nextTokenId.add(1);

        super._mint(msg.sender, tokenId);
        super._setTokenURI(tokenId, tokenURI);

        emit Mint(msg.sender, tokenId);

        return tokenId;
    }
}