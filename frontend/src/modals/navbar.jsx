import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWalletAdress } from "../redux/features/walletdata/walletSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <nav className="navbar">
      <div className="container d-flex justify-content-center">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-6 m-auto p-0">
            <h1>Managecription</h1>
          </div>
          <div className="col-6 d-flex p-0" style={{ flexDirection: "row-reverse" }}>
            {!wallet ? (
              <button className="button1" onClick={connectWallet}>Connect Wallet</button>
            ) : (
              <button className="button1">{wallet}</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
