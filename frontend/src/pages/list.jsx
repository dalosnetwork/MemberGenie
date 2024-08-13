import "../design/App.css";
import React, { useEffect, useState } from "react";
import tokenimg from "../design/assets/token.png";
import MobilePage from "../modals/mobile.jsx";
import buyutec from "../design/assets/buyutec.svg";
import ModalTrain from "../modals/modalTrain.jsx";
import ModalSell from "../modals/modalSell.jsx";
import { useDispatch, useSelector } from "react-redux";
import fetchAllRedux from "../redux/fetchAllRedux.js";
import { useNavigate } from "react-router";
import Navbar from "../modals/navbar.jsx";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const { wallet } = useSelector((state) => state.wallet);

  return (
    <>
      <Navbar/>
      {wallet ? (
        <>
          <div id="list">
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-12 text-center">
                  <h2>Subscribers</h2>
                  <div className="row">
                    <div className="col-1">1</div>
                    <div className="col-7 text-start">wallet address</div>
                    <div className="col-4">subscription date</div>
                  </div>
                  <div className="row">
                    <div className="col-1">1</div>
                    <div className="col-7 text-start">0x026961474a29E075F1b94e2876579590d89c43b3</div>
                    <div className="col-4">31.12.2024</div>
                  </div>

                  
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
