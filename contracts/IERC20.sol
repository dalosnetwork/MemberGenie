// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IERC20 {
    function decimals() external view returns (uint8);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}
