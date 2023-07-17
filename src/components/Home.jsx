import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "../abi/abi.json";
import config from "../config/config";

const Home = ({ username }) => {
  const [user, setUser] = useState([]);
  const abi = ABI.abi;
  const contractAddress = config.contractAddress;

  const get = async (e) => {
    e.preventDefault();
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const userData = await contract.retrieveUserFromName(username);
        console.log(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={get}>get</button>
      {user.map((user) => {
        return (
          <div>
            <h3>{user.username}</h3>
            <h3>{user._address}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
