// src/pages/decks.jsx

import "../design/App.css";
import React, { useEffect, useState } from "react";
import MobilePage from "../modals/mobile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ethers } from 'ethers';
import Navbar from "../modals/navbar";
import click from "../design/assets/click.png"
import genie from "../design/assets/genie.png"
import warn from "../design/assets/warn.png"
import { getWalletAdress } from "../redux/features/walletdata/walletSlice";

const Decks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);

  const { wallet, status, error } = useSelector((state) => state.wallet);
  
  const connectWallet = async () => {
    dispatch(getWalletAdress());
    navigate("/panel")
  };
  
  useEffect(()=>{
    sessionStorage.setItem("blur", true)
  },[])
  useEffect(() => {
    if (status === 'succeeded' && wallet) {
      console.log('Wallet connected:', wallet);
    } else if (status === 'failed') {
      console.error('Error connecting wallet:', error);
    }
  }, [status, wallet, error]);




  return (
    <>
        <Navbar/>
        <div id="landing">
          <div className="container m-auto">
            <div className="row d-flex justify-content-center">
              <div className="col-5 m-auto position-relative">
                <img className="click" src={click} alt="" />
                <h1 className="header">One-Click<br/>Crypto Subscription: Effortless, Automated Payments!</h1>
                <p className="text">Streamline your payment process with <span className="bold">seamless, 
                automated subscriptions. Set it once </span>and enjoy <span className="bold">hassle-free payments</span>, 
                directly to your wallet, <span className="bold">whenever you choose.</span></p>
                <button className="button1" onClick={connectWallet}>Connect Wallet</button>
                <div className="d-flex">
                  <img className="warn" src={warn} alt="" />
                  <p className="info ms-2 my-auto">Link the wallet used for your service to easily<br/> set up automated subscription payments</p>
                </div>
              </div>
              <div className="col-7 m-auto d-flex justify-content-center">
                <img className="landing" src={genie} alt="" />
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Decks;
