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

const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const CodeBlock = ({ code }) => (
  <pre style={{ background: "#000", padding: "10px", borderRadius: "5px" }}>
    <code dangerouslySetInnerHTML={{ __html: escapeHtml(code) }} />
  </pre>
);

const Panel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);

  const [platformName, setPlatformName] = useState("");
  const [acceptedToken, setAcceptedToken] = useState("");
  const [amountPerTransaction, setAmountPerTransaction] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");

  const { wallet } = useSelector((state) => state.wallet);

  const handlePlatformNameChange = (e) => {
    setPlatformName(e.target.value);
    console.log(e.target.value)
  };

  const handleAcceptedTokenClick = (token) => {
    setAcceptedToken(token);
    console.log(token)
  };

  const handleAmountChange = (e) => {
    setAmountPerTransaction(e.target.value);
    console.log(e.target.value)
  };

  const handleFrequencyChange = (e) => {
    setPaymentFrequency(e.target.value);
    console.log(e.target.value)
  };

  const codeString = `
  // Function to capture payment details from the user
    function capturePaymentDetails() {
    // Get payment amount from the input field
    const paymentAmount = document.getElementById('paymentAmount').value;

    // Get payment frequency from the input field (e.g., weekly, monthly)
    const paymentFrequency = document.getElementById('paymentFrequency').value;

    // Validate the inputs
    if (paymentAmount && paymentFrequency) {
        // Process the payment details

`;

  return (
    <>
      <Navbar />
      {wallet ? (
        <>
          <div id="panel">
            <div><span>(0 days left) <button>Claim</button></span></div>
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-12">
                  <p>
                    Fill out the form below to set your subscription payment up.
                  </p>
                  <p>
                    Platform Name:{" "}
                    <span>
                      <input type="text" placeholder="111" value={platformName} onChange={handlePlatformNameChange}/>
                    </span>
                  </p>
                  <p>
                    Accepted Tokens:{" "}
                    <span>
                      <button onClick={() => handleAcceptedTokenClick("TOKEN1")}>
                        TOKEN1
                      </button>
                      <button onClick={() => handleAcceptedTokenClick("TOKEN2")}>
                        TOKEN2
                      </button>
                      <button onClick={() => handleAcceptedTokenClick("TOKEN3")}>
                        TOKEN3
                      </button>
                    </span>
                  </p>
                  <p>{acceptedToken}</p>
                  <p>
                    Amount per transactions:{" "}
                    <span>
                      <input type="text" placeholder="111" value={amountPerTransaction} onChange={handleAmountChange}/>
                    </span>
                  </p>
                  <p>
                    Payment Frequency(days):{" "}
                    <span>
                      <input type="text" placeholder="111" value={paymentFrequency} onChange={handleFrequencyChange}/>
                    </span>
                  </p>
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <div
                    className="row d-flex justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <div className="col-12  d-flex justify-content-center">
                      <button className="button1">Connect Wallet</button>
                    </div>
                    <div className="col-3  d-flex justify-content-center">
                      <div className="row">
                        <div className="col">img</div>
                        <div className="col">
                          Once you set your subscription, you cannot set up a new
                          one with the wallet you connected.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <p>
                    Use the code below to integrade the subscription system to your
                    service:
                  </p>
                  <div className="row">
                    <div className="col-12">
                      <button style={{ width: "auto" }}>123</button>
                      <button style={{ width: "auto" }}>123</button>
                      <button style={{ width: "auto" }}>123</button>
                    </div>
                  </div>
                  <div>
                    <CodeBlock code={codeString} />
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

export default Panel;
