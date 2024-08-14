import "../design/App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchAllRedux from "../redux/fetchAllRedux.js";
import { useNavigate } from "react-router";
import Navbar from "../modals/navbar.jsx";
import warn from "../design/assets/warn.png";
import cancel from "../design/assets/cancel.png";
import export1 from "../design/assets/export.png";
import cancelorange from "../design/assets/cancelorange.png";
import { ethers, Wallet } from "ethers";
import { MaxUint256 } from "ethers";
import { isPayed } from "../api/ApiServices.js";

const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const CodeBlock = ({ code }) => (
  <pre>
    <code dangerouslySetInnerHTML={{ __html: escapeHtml(code) }} />
  </pre>
);

const Panel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CONTRACT_ADDRESS = "0x8c0C5af8a0Ef0550B3C6ad4C1F7Bc6D86F1b506A";

  const [blur, setBlur] = useState(true);

  const [platformName, setPlatformName] = useState("");
  const [acceptedToken, setAcceptedToken] = useState("");
  const [amountPerTransaction, setAmountPerTransaction] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");

  const [temp, setTemp] = useState(false);

  const { wallet } = useSelector((state) => state.wallet);

  useEffect(() => {
    handleCheckIsPayed();
  },[wallet, temp]);

  const handlePlatformNameChange = (e) => {
    setPlatformName(e.target.value);
    console.log(e.target.value);
  };

  const handleAcceptedTokenClick = (token) => {
    setAcceptedToken(token);
    console.log(token);
  };

  const handleAmountChange = (e) => {
    setAmountPerTransaction(e.target.value);
    console.log(e.target.value);
  };

  const handleFrequencyChange = (e) => {
    setPaymentFrequency(e.target.value);
    console.log(e.target.value);
  };

  const handleCheckIsPayed = async () => {
    try {
      const data = await isPayed(wallet);
      console.log(data);
      if (data === false) {
        handleCheckSystemWallet();
      } else {
        setBlur(true);
      }
    } catch (error) {
      console.log("Error retrieving payment status");
    }
  };

  const react = `
  //PLEASE IMPORT ETHER JS AT THE TOP OF THE FILE
  import { ethers } from "ethers";
  //IMPORTANT

    const handleApproveToken = async (tokenAddress) => {
    const TOKEN_ABI = [
      "function approve(address spender, uint256 amount) public returns (bool)",
      "function decimals() public view returns (uint8)"
    ];
      try {
          if (typeof window.ethereum === 'undefined') {
              throw new Error('MetaMask is not installed');
          }

          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          const tokenContract = new ethers.Contract(tokenAddress, TOKEN_ABI, signer);
          
          const maxApproval = ethers.MaxUint256;

          const tx = await tokenContract.approve(${CONTRACT_ADDRESS}, maxApproval);
          
          await tx.wait();
          console.log('Token approved successfully!');
          handleAddNewMember()

      } catch (error) {
          console.error('Error during approve process:', error);
          
    }
  };

  const handleAddNewMember = async () => {
      const MEMBER_GENIE_ABI = [
          "function addNewMember(address _systemWallet) public returns (bool)"
      ];
        try {
            if (typeof window.ethereum === 'undefined') {
                throw new Error('MetaMask is not installed');
            }

            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const contract = new ethers.Contract(CONTRACT_ADDRESS, MEMBER_GENIE_ABI, signer);

            const systemWalletAddress = ${wallet};

            const tx = await contract.addNewMember(systemWalletAddress);

            console.log('Transaction sent. Waiting for confirmation...');
            await tx.wait();
            console.log('New member added successfully!');
        } catch (error) {
            console.error('Error:', error);
    }
  };
        `;

  const angular = `
  //PLEASE IMPORT ETHER JS AT THE TOP OF THE FILE
  import { ethers } from "ethers";
  import { Injectable } from '@angular/core';
  import { environment } from '../environments/environment'; // Assuming your contract address is stored here
  //IMPORTANT


    @Injectable({
      providedIn: 'root'
    })
    export class TokenService {

      async handleApproveToken(tokenAddress: string): Promise<void> {
        const TOKEN_ABI = [
          "function approve(address spender, uint256 amount) public returns (bool)",
          "function decimals() public view returns (uint8)"
        ];

        try {
          if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
          }

          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          const tokenContract = new ethers.Contract(${wallet}, TOKEN_ABI, signer);
          const maxApproval = ethers.MaxUint256;

          const tx = await tokenContract.approve(${CONTRACT_ADDRESS}, maxApproval);
          await tx.wait();
          console.log('Token approved successfully!');
          this.handleAddNewMember();
        } catch (error) {
          console.error('Error during approve process:', error);
        }
      }

      async handleAddNewMember(): Promise<void> {
        const MEMBER_GENIE_ABI = [
          "function addNewMember(address _systemWallet) public returns (bool)"
        ];

        try {
          if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
          }

          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          const contract = new ethers.Contract(environment.contractAddress, MEMBER_GENIE_ABI, signer);

          const systemWalletAddress = environment.systemWalletAddress; // Assuming wallet address is stored here

          const tx = await contract.addNewMember(systemWalletAddress);
          console.log('Transaction sent. Waiting for confirmation...');
          await tx.wait();
          console.log('New member added successfully!');
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }

    
        `;

  const vue = `
  //PLEASE IMPORT ETHER JS AT THE TOP OF THE FILE
  import { ethers } from "ethers";
  //IMPORTANT

  export default {
    name: 'TokenApproval',
    methods: {
      async handleApproveToken() {
        const TOKEN_ABI = [
          "function approve(address spender, uint256 amount) public returns (bool)",
          "function decimals() public view returns (uint8)"
        ];

        try {
          if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
          }

          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          const tokenContract = new ethers.Contract(${wallet}, TOKEN_ABI, signer);
          const maxApproval = ethers.MaxUint256;

          const tx = await tokenContract.approve(${CONTRACT_ADDRESS}, maxApproval);
          await tx.wait();
          console.log('Token approved successfully!');
          this.handleAddNewMember();
        } catch (error) {
          console.error('Error during approve process:', error);
        }
      },

      async handleAddNewMember() {
        const MEMBER_GENIE_ABI = [
          "function addNewMember(address _systemWallet) public returns (bool)"
        ];

        try {
          if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
          }

          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          const contract = new ethers.Contract(process.env.VUE_APP_CONTRACT_ADDRESS, MEMBER_GENIE_ABI, signer);
          const systemWalletAddress = process.env.VUE_APP_SYSTEM_WALLET_ADDRESS;

          const tx = await contract.addNewMember(systemWalletAddress);
          console.log('Transaction sent. Waiting for confirmation...');
          await tx.wait();
          console.log('New member added successfully!');
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
        `;

  const handleCheckSystemWallet = async () => {
    const MEMBER_GENIE_ABI = [
      "function GetIsSystemWallet(address) public view returns (bool)",
    ];
    console.log("Checking...");
    console.log(null);

    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);

      const network = await provider.getNetwork();
      console.log("Connected to network:", network.name);

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        MEMBER_GENIE_ABI,
        provider
      );

      const result = await contract.GetIsSystemWallet(wallet);
      setTemp(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreateMembershipSystem = async () => {
    const MEMBER_GENIE_ABI = [
      "function createNewMembershipSystem(string memory _platformName, address _tokenAddress, uint256 _cliff, uint256 _amount) public returns (bool)",
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
        MEMBER_GENIE_ABI,
        signer
      );
      const tx = await contract.createNewMembershipSystem(
        platformName,
        "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
        paymentFrequency * 24 * 60 * 60,
        amountPerTransaction
      );

      console.log("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      console.log("Membership system created successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };



  /*   const handleAddNewMember = async () => {

    const MEMBER_GENIE_ABI = [
        "function addNewMember(address _systemWallet) public returns (bool)"
    ];

    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_ADDRESS, MEMBER_GENIE_ABI, signer);
        const tx = await contract.addNewMember("0x026961474a29E075F1b94e2876579590d89c43b3");

        console.log('Transaction sent. Waiting for confirmation...');
        await tx.wait();
        console.log('New member added successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
  };
 */

  //USERA VERİLECEK

  const handleStripe = async () => {
    sessionStorage.setItem("temp", wallet);
    window.location.href = "https://buy.stripe.com/test_dR615IaOH5FDdygfYY";
  };

  return (
    <>
      <div className={`overlay ${blur ? "show" : ""}`}>
        <div className="modalContent">
          <img
            className="cancel"
            src={cancelorange}
            alt=""
            onClick={() => navigate("/")}
          />
          <p>
            Use the link below to make the payment in order to begin using the
            system:
          </p>
          <span onClick={() => handleStripe()}>
            Forward to Stripe.com <img src={export1} alt="" />
          </span>
        </div>
      </div>
      <Navbar />
      <>
{/*         <button onClick={() => handleCheckSystemWallet()}>DENEME</button>
        <button onClick={() => handleCreateMembershipSystem()}>
          create membership system
        </button>
        <button onClick={() => handleWithdraw()}>WITHDRAW</button>
        <button onClick={() => handleGetMember()}>member</button> */}
        <div id="panel">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-12">
                <p className="text1">
                  Fill out the form below to set your subscription payment up.
                </p>
                <p className="label">
                  Platform Name:{" "}
                  <span>
                    <input
                      type="text"
                      placeholder="Enter platform name"
                      value={platformName}
                      onChange={handlePlatformNameChange}
                    />
                  </span>
                </p>
                <p className="label d-flex" style={{ alignItems: "center" }}>
                  Accepted Tokens:{" "}
                  <span className="d-flex">
                    <button
                      className={`button ${
                        acceptedToken === "USDT" ? "active" : ""
                      }`}
                      onClick={() =>
                        acceptedToken === "USDT"
                          ? setAcceptedToken("")
                          : handleAcceptedTokenClick("USDT")
                      }
                    >
                      {acceptedToken === "USDT" ? (
                        <>
                          USDT
                          <img className={"cancel"} src={cancel} alt="" />
                        </>
                      ) : (
                        <>USDT</>
                      )}
                    </button>
                    <button
                      className={`button ${
                        acceptedToken === "TOKEN2" ? "active" : ""
                      }`}
                      onClick={() =>
                        acceptedToken === "TOKEN2"
                          ? setAcceptedToken("")
                          : handleAcceptedTokenClick("TOKEN2")
                      }
                    >
                      {acceptedToken === "TOKEN2" ? (
                        <>
                          TOKEN2
                          <img className={"cancel"} src={cancel} alt="" />
                        </>
                      ) : (
                        <>TOKEN2</>
                      )}
                    </button>
                    <button
                      className={`button ${
                        acceptedToken === "TOKEN3" ? "active" : ""
                      }`}
                      onClick={() =>
                        acceptedToken === "TOKEN3"
                          ? setAcceptedToken("")
                          : handleAcceptedTokenClick("TOKEN3")
                      }
                    >
                      {acceptedToken === "TOKEN3" ? (
                        <>
                          TOKEN3
                          <img className={"cancel"} src={cancel} alt="" />
                        </>
                      ) : (
                        <>TOKEN3</>
                      )}
                    </button>
                  </span>
                </p>
                <p className="label">
                  Amount per transactions:{" "}
                  <span>
                    <input
                      type="text"
                      placeholder="0"
                      value={amountPerTransaction}
                      onChange={handleAmountChange}
                    />
                  </span>
                </p>
                <p className="label">
                  Payment Frequency(days):{" "}
                  <span>
                    <input
                      type="text"
                      placeholder="0"
                      value={paymentFrequency}
                      onChange={handleFrequencyChange}
                    />
                  </span>
                </p>
              </div>

              <div className="col-12 d-flex justify-content-center mt-5">
                {temp ? (
                  <>
                    <div
                      className="row d-flex justify-content-center"
                      style={{ width: "100%" }}
                    >
                      <div className="col-12 d-flex justify-content-center">
                        <button className="button1 disable" >
                          Set Subscription
                        </button>
                      </div>
                      <div className="col-4 mt-3 d-flex justify-content-center">
                        <div className="d-flex">
                          <img className="warn" src={warn} alt="" />
                          <p className="info m-auto">
                            Once you set your subscription, you cannot set up a
                            new one with the wallet you connected.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="row d-flex justify-content-center"
                      style={{ width: "100%" }}
                    >
                      <div className="col-12 d-flex justify-content-center">
                        <button className="button1" onClick={()=>handleCreateMembershipSystem()}>Set Subscription</button>
                      </div>
                      <div className="col-4 mt-3 d-flex justify-content-center">
                        <div className="d-flex">
                          <img className="warn" src={warn} alt="" />
                          <p className="info m-auto">
                            Once you set your subscription, you cannot set up a
                            new one with the wallet you connected.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {temp ? (<>
                <div className="col-12">
                  <p className="text2">
                    Use the code below to integrade the subscription system to
                    your service:
                  </p>
                  <div className="row">
                    <div className="col-12">
                      <ul class="nav nav-tabs" id="frameworks" role="tablist">
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >
                            React
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link"
                            id="profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                          >
                            Angular
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link"
                            id="contact-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#contact"
                            type="button"
                            role="tab"
                            aria-controls="contact"
                            aria-selected="false"
                          >
                            Vue
                          </button>
                        </li>
                      </ul>
                      <div class="tab-content" id="frameworksContent">
                        <div
                          class="position-relative tab-pane fade show active"
                          id="home"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <button className="copy">Copy</button>
                          <CodeBlock code={react} />
                        </div>
                        <div
                          class="position-relative tab-pane fade"
                          id="profile"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                        >
                          <button className="copy">Copy</button>
                          <CodeBlock code={angular} />
                        </div>
                        <div
                          class="position-relative tab-pane fade"
                          id="contact"
                          role="tabpanel"
                          aria-labelledby="contact-tab"
                        >
                          <button className="copy">Copy</button>
                          <CodeBlock code={vue} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>              
              </>):(<>
              

              </>)

              }

            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Panel;
