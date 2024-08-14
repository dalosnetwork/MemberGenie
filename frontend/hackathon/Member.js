import React, { useState } from "react";
import { ethers } from "ethers";

// Kontratın ABI'si (sadece gerekli olan kısımlar)
const MEMBER_GENIE_ABI = [
  "function Member(address) public view returns (address[])"
];

const CheckMembers = () => {
  const [systemWallet, setSystemWallet] = useState("");
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState("");

  const handleCheckMembers = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Cüzdan bağlantısı
        const signer = provider.getSigner();

        const contractAddress = "0xASDFAETEST"; // Sepolia ağındaki kontrat adresi
        const contract = new ethers.Contract(contractAddress, MEMBER_GENIE_ABI, signer);

        // Member mapping'ini çağır
        const memberAddresses = await contract.Member(systemWallet);
        setMembers(memberAddresses);

        setStatus(`Members for ${systemWallet} retrieved successfully.`);
      } else {
        setStatus("Metamask is not installed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Failed to retrieve members.");
    }
  };