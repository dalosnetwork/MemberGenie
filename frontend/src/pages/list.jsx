import "../design/App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchAllRedux from "../redux/fetchAllRedux.js";
import { useNavigate } from "react-router";
import Navbar from "../modals/navbar.jsx";
import { ethers } from "ethers";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [members, setMember] = useState([]);
  const { wallet } = useSelector((state) => state.wallet);
  const CONTRACT_ADDRESS = "0x8c0C5af8a0Ef0550B3C6ad4C1F7Bc6D86F1b506A";



  const handleWithdraw = async () => {
    const MEMBER_GENIE_ABI = [
      "function withdrawPaymentFromMembers() public returns (bool)",
    ];

    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      const network = await provider.getNetwork();
      console.log("Connected to network:", network.name);

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        MEMBER_GENIE_ABI,
        signer
      ); // Signer ile contract oluştur

      const result = await contract.withdrawPaymentFromMembers();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      alert("You cannot claim right now");
    }
  };

  const handleGetMember = async () => {
    const contractAbi = [
      "function GetMember(address _systemWallet) public view returns (address[])",
    ];

    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractAbi,
        signer
      );

      const members = await contract.GetMember(wallet);
      console.log(members)
      setMember(members)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useState(()=>{
    handleGetMember()
  })


  return (
    <>
      <Navbar/>
      {wallet ? (
        <>
          <div id="list">

            <div className="container position-relative">
          <div className="left"><span><button className="button1" onClick={()=>handleWithdraw()}>Claim</button></span></div>
              <div className="row d-flex justify-content-center">
                <div className="col-12">
                  <h2 className="header">Subscribers</h2>
                  <div className="row" style={{width:"41%"}} >
                    <div className="col-1"></div>
                    <div className="col-7 text-start title">Wallet Address</div>
                  </div>
                  {members && Object.entries(members).map(([key, value], index) => (
                  <div className="row text">
                      <div className="col-1">{index+1}</div>
                      <div className="col-7 text-start">{value}</div>
                  </div>
                  ))}

                  
                </div>
              </div>
            </div>
          </div>
        </>
      ):(
        <>
          please connect your wallet
        </>
      )
      }
    </>
  );
};

export default List;
