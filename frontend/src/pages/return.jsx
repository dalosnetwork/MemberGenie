import "../design/App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchAllRedux from "../redux/fetchAllRedux.js";
import { useNavigate } from "react-router";
import Navbar from "../modals/navbar.jsx";
import warn from "../design/assets/warn.png"
import cancel from "../design/assets/cancel.png"
import cancelorange from "../design/assets/cancelorange.png"
import { ethers } from "ethers";
import { MaxUint256 } from 'ethers';
import { isPayed, paymentDone } from "../api/ApiServices.js";
import { getWalletAdress } from "../redux/features/walletdata/walletSlice.js";


const Return = () => {

  // ZAMAN KALIRSA HISTORY ÇAK

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wallet } = useSelector((state) => state.wallet);
  
  const handlePaymentDone = async () => {
    try {
      const data = await paymentDone(wallet);
      if (data) {
        console.log("Payment status updated successfully");
        console.log(data.message);
      } else {
        console.log("Failed to update payment status");
        console.log("Failed to update payment status");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      console.log("Error updating payment status");
    }
  };

  useEffect(()=>{
    handlePaymentDone()
    dispatch(getWalletAdress());
    navigate("/panel")
  })

};

export default Return;



