import React, { useState } from "react";
import { ethers } from "ethers";

// Kontratın ABI'si (sadece gerekli olan kısımlar)
const MEMBER_GENIE_ABI = [
  "function withdrawPaymentFromMembers() public returns (bool)"
];

const WithdrawPayments = () => {
  const [status, setStatus] = useState("");

  const handleWithdrawPayments = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Cüzdan bağlantısı
        const signer = provider.getSigner();

        const contractAddress = "0xASDFAETEST"; // Sepolia ağındaki kontrat adresi
        const contract = new ethers.Contract(contractAddress, MEMBER_GENIE_ABI, signer);

        // withdrawPaymentFromMembers fonksiyonunu çağır
        const tx = await contract.withdrawPaymentFromMembers();
        await tx.wait(); // İşlemin gerçekleşmesini bekle

        setStatus("Payments successfully withdrawn from members!");
      } else {
        setStatus("Metamask is not installed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Failed to withdraw payments.");
    }
  };