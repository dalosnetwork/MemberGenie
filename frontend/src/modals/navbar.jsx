import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWalletAdress } from "../redux/features/walletdata/walletSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { isPayed, paymentDone } from "../api/ApiServices";
import { Wallet } from "ethers";
import genie from "../design/assets/genie.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wallet, status, error } = useSelector((state) => state.wallet);

  const connectWallet = async () => {
    dispatch(getWalletAdress());
    navigate("/panel");
  };

  useEffect(() => {
    if (status === "succeeded" && wallet) {
      console.log("Wallet connected:", wallet);
    } else if (status === "failed") {
      console.error("Error connecting wallet:", error);
    }
  }, [status, wallet, error]);

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

  const truncate = (str) => {
    if (str.length <= 10) {
      return str; // Return the string as is if it's shorter than or equal to 10 characters
    }
    const firstPart = str.substring(0, 10);
    const lastPart = str.substring(str.length - 5, str.length);
    return `${firstPart}...${lastPart}`;
  };

  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-center">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-6 m-auto p-0">
            <h1>
              <img src={genie} style={{ maxWidth: "100px" }} alt="" />
              Member Genie
            </h1>
          </div>
          <div className="col-6 d-flex p-0" style={{ flexDirection: "row-reverse" }}>
            {!wallet ? (
              <button className="button1" style={{height: "60px", margin:"auto 0 auto 15px"}}  onClick={connectWallet}>
                Connect Wallet
              </button>
            ) : (
              <button className="button1" style={{height: "60px", margin:"auto 0 auto 15px"}} >{truncate(wallet)}</button>
            )}
            <div className="sidebar-ul2 d-flex my-auto me-4">
              <div>
                <NavLink exact to={"/panel"} className="sidebar-link" activeClassName="side-active">
                  Plan
                </NavLink>
              </div>
              <div>
                <NavLink exact to={"/list"} className="sidebar-link ms-4" activeClassName="side-active">
                  Subscribers
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
