import React, { useState } from "react";
import { ethers } from "ethers";

// Kontratın ABI'si (sadece gerekli olan kısımlar)
const MEMBER_GENIE_ABI = [
  "function addNewMember(address _systemWallet) public returns (bool)"
];

const AddNewMember = () => {
  const [systemWallet, setSystemWallet] = useState("");
  const [status, setStatus] = useState("");

  const handleAddNewMember = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Cüzdan bağlantısı
        const signer = provider.getSigner();

        const contractAddress = "0xASDFAETEST"; // Sepolia ağındaki kontrat adresi
        const contract = new ethers.Contract(contractAddress, MEMBER_GENIE_ABI, signer);

        // addNewMember fonksiyonunu çağır
        const tx = await contract.addNewMember(systemWallet);
        await tx.wait(); // İşlemin gerçekleşmesini bekle

        setStatus("Successfully added as a new member!");
      } else {
        setStatus("Metamask is not installed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Failed to add new member.");
    }
  };