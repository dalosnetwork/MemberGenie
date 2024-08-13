// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

struct MembershipSystem {
    address systemWallet;
    string platformName;
    address tokenAddress;
    uint256 cliff;
    uint256 amount;
}
