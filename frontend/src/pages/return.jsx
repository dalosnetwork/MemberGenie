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
  const tempaddress = sessionStorage.getItem("temp")

  const handlePaymentDone = async () => {
    try {
      const data = await paymentDone(tempaddress);
      if (data) {
        console.log("Payment status updated successfully");
      } else {
        console.log("Failed to update payment status");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  useEffect(()=>{
    handlePaymentDone()
    dispatch(getWalletAdress());
    navigate("/")
  })

};

export default Return;



