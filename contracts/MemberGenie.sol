// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./MembershipSystem.sol";
import "./IERC20.sol";

contract MemberGenie {
    mapping(address => bool) public isSystemWallet;
    mapping(address => MembershipSystem) public MembershipSystems;
    mapping(address => mapping(address => bool)) public isMember;
    mapping(address => address[]) public Member; // system => customers
    mapping(address => uint256) public NextPayment; // system => time

    event createNewMembershipSystemEvent(
        address _systemWallet,
        string _platformName,
        address _tokenAddress,
        uint256 _cliff,
        uint256 _amount
    );

    event addNewMemberEvent(address _systemWallet, address _user);

    event withdrawPaymentFromMembersEvent(address _systemWallet);

    function createNewMembershipSystem(
        string memory _platformName,
        address _tokenAddress,
        uint256 _cliff,
        uint256 _amount
        ) public returns (bool) {

        require(!isSystemWallet[msg.sender], "You are already system wallet.");

        uint8 decimals = IERC20(_tokenAddress).decimals();
        uint256 scaledAmount = _amount * (10 ** decimals);

        MembershipSystems[msg.sender] = MembershipSystem({
            systemWallet: msg.sender,
            platformName: _platformName,
            tokenAddress: _tokenAddress,
            cliff: _cliff,
            amount: scaledAmount
        });

        NextPayment[msg.sender] = block.timestamp + _cliff;
        isSystemWallet[msg.sender] = true;
        
        emit createNewMembershipSystemEvent(msg.sender, _platformName, _tokenAddress, _cliff, _amount);

        return true;
    }

    function addNewMember(address _systemWallet) public returns (bool) {
        require(isSystemWallet[_systemWallet], "Not a system wallet");
        require(!isMember[_systemWallet][msg.sender], "Already member");

        MembershipSystem memory membership = MembershipSystems[_systemWallet];

        uint256 daysLeft = (NextPayment[_systemWallet] - block.timestamp) / 1 days;

        uint256 paymentAmount = (membership.amount * daysLeft) / (membership.cliff / 1 days);
        IERC20(membership.tokenAddress).transferFrom(msg.sender, _systemWallet, paymentAmount);

        isMember[_systemWallet][msg.sender] = true;
        Member[_systemWallet].push(msg.sender);

        emit addNewMemberEvent(_systemWallet, msg.sender);

        return true;
    }

    function withdrawPaymentFromMembers() public returns (bool) {
        require(isSystemWallet[msg.sender], "You are not a system wallet");
        require(block.timestamp >= NextPayment[msg.sender], "You can not take payment right now");

        MembershipSystem memory membership = MembershipSystems[msg.sender];
        address[] memory members = Member[msg.sender];

        for (uint256 i = 0; i < members.length; i++) 
        {
            IERC20(membership.tokenAddress).transferFrom(members[i], msg.sender, membership.amount);
        }

        NextPayment[msg.sender] += membership.cliff;

        emit withdrawPaymentFromMembersEvent(msg.sender);

        return true;
    }
}
