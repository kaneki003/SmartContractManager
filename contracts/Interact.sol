// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Interact {
    function winner(address attempt) external {
        (bool succes, ) = attempt.call(abi.encodeWithSignature("attempt()"));
        require(succes, "You failed");
    }
}
