import React, { useState } from "react";
import { ethers } from "ethers";

// Kontratın ABI'si (sadece gerekli olan kısımlar)
const MEMBER_GENIE_ABI = [
  "function NextPayment(address) public view returns (uint256)"
];

const CheckNextPayment = () => {
  const [systemWallet, setSystemWallet] = useState("");
  const [nextPayment, setNextPayment] = useState(null);
  const [status, setStatus] = useState("");

  const handleCheckNextPayment = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Cüzdan bağlantısı
        const signer = provider.getSigner();

        const contractAddress = "0xASDFAETEST"; // Sepolia ağındaki kontrat adresi
        const contract = new ethers.Contract(contractAddress, MEMBER_GENIE_ABI, signer);

        // NextPayment fonksiyonunu çağır
        const paymentTime = await contract.NextPayment(systemWallet);
        
        // Zaman damgasını insan tarafından okunabilir bir forma çevir
        const date = new Date(paymentTime.toNumber() * 1000);
        setNextPayment(date.toLocaleString());

        setStatus(`Next payment time for ${systemWallet} is ${date.toLocaleString()}.`);
      } else {
        setStatus("Metamask is not installed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Failed to retrieve next payment time.");
    }
  };
