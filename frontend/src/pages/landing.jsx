// src/pages/decks.jsx

import "../design/App.css";
import React, { useEffect, useState } from "react";
import MobilePage from "../modals/mobile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ethers } from 'ethers';
import Navbar from "../modals/navbar";
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
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-6">
                click image
                <h1>One-Click Crypto Subscription: Effortless, Automated Payments!</h1>
                <p>Streamline your payment process with seamless, automated subscriptions. Set it once and enjoy hassle-free payments, directly to your wallet, whenever you choose.</p>
                <button className="button1" onClick={connectWallet}>Connect Wallet</button>
                <p>Link the wallet used for your service to easily set up automated subscription payments</p>
              </div>
              <div className="col-6">
                IMAGE
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Decks;
