import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";
import ABI from "../abi/abi.json";
import Home from "./Home";
import config from "../config/config";
import "../styles/Connect.css";

const Connect = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const abi = ABI.abi;
  const contractAddress = config.contractAddress;

  const handleUsername = async (e) => {
    setUsername(e.target.value);
  };

  const connectWalletAndSignUp = async (e) => {
    e.preventDefault();
    try {
      const { ethereum } = window;
      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log(process.env.CONTRACT_ADDRESS);

        setAddress(accounts[0]);
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const createUser = await contract.register(username);
        console.log("User created");
        window.localStorage.setItem("address", accounts[0]);
        window.localStorage.setItem("isSetupPhaseDone", false);
        setIsLogged(true);
      }
    } catch (error) {
      console.log(error);
      setError("An error as accured.");
    }
  };

  const isSetupPhaseDone = window.localStorage.getItem("isSetupPhaseDone");

  return (
    <div className="body">
      {!isLogged && !isSetupPhaseDone ? (
        <form onSubmit={connectWalletAndSignUp} className="form">
          <input
            type="text"
            placeholder="Username"
            onChange={handleUsername}
            required
          />
          <button onClick={connectWalletAndSignUp}>
            <Link to="/setuphase__routines">
              <FaWallet /> Connect Wallet
            </Link>
          </button>
          <span className="error">{error}</span>
          <h2>You need Chrome to be able to run this app.</h2>
        </form>
      ) : (
        <Home username={username} />
      )}
    </div>
  );
};

export default Connect;
