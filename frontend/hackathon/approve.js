import React, { useState } from "react";
import { ethers } from "ethers";

// USDT kontratının ABI'si (sadece gerekli olan kısımlar)
const USDT_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
];

const ApproveToken = ({ tokenAddress, spenderAddress, amount }) => {
  const [status, setStatus] = useState("");

  const handleApprove = async () => {
    try {
      // Metamask veya başka bir cüzdan bağlantısını sağla
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Cüzdan bağlantısı
        const signer = provider.getSigner();

        // USDT kontratının adresi ve instanc'ını oluştur
        const USDTContractAddress = tokenAddress; // Sepolia USDT kontrat adresi
        const USDTContract = new ethers.Contract(USDTContractAddress, USDT_ABI, signer);

        // Onaylamak istediğin miktarı 12 ile çarp
        const adjustedAmount = ethers.utils.parseUnits(amount.toString(), 6).mul(12);

        // Approve işlemini gerçekleştir
        const tx = await USDTContract.approve(spenderAddress, adjustedAmount);
        await tx.wait(); // İşlemin gerçekleşmesini bekle

        setStatus("Approve işlemi başarılı!");
      } else {
        setStatus("Metamask yüklü değil!");
      }
    } catch (error) {
      console.error("Hata:", error);
      setStatus("Approve işlemi başarısız.");
    }
  };