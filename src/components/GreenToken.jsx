import React from "react";
import { Leaf, Globe, LineChart, Star, Handshake, Coins, Users, Flame } from 'lucide-react';
import { useState } from "react";
import transfer from "../components/GreenToken.json"
import { ethers } from "ethers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const contractABI = transfer.abi;

function GreenToken() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [initialFootprint, setInitialFootprint] = useState(101); // example value
  const [currentFootprint, setCurrentFootprint] = useState(100);  // user-submitted value

  const hasDecreased = currentFootprint < initialFootprint;
  const percentageDecrease = hasDecreased
  ? ((initialFootprint - currentFootprint) / initialFootprint) * 100
  : 0;
  const tokensProvided = hasDecreased ? Math.ceil(percentageDecrease * 10) : 0;
 

  
  const data = [
    { percentageDecrease: '10%', tokensProvided: 100 },
    { percentageDecrease: '20%', tokensProvided: 200},
    { percentageDecrease: '30%', tokensProvided: 300},
    { percentageDecrease: '40%', tokensProvided: 400},
    { percentageDecrease: '50%', tokensProvided: 500},
    { percentageDecrease: '75%', tokensProvided: 750},
    { percentageDecrease: '>100%', tokensProvided: 1000}
  ];

  const benefits = [
    { icon: <Leaf className="w-6 h-6 text-green-600" />, title: "Encourages Sustainable Behavior", desc: "Rewards users for adopting eco-friendly habits and reducing carbon footprint." },
    { icon: <Globe className="w-6 h-6 text-blue-600" />, title: "Transparent & Trustworthy", desc: "Blockchain-based records ensure transparency, traceability, and fairness." },
    { icon: <LineChart className="w-6 h-6 text-indigo-600" />, title: "Scalable Across Industries", desc: "Applicable in energy, transport, agriculture, and more — promoting broad impact." },
    { icon: <Coins className="w-6 h-6 text-yellow-500" />, title: "Monetary & Market Value", desc: "Tradable or redeemable tokens give real-world utility to sustainable actions." },
    { icon: <Star className="w-6 h-6 text-pink-500" />, title: "Gamifies Sustainability", desc: "Creates goals and challenges that keep individuals engaged long-term." },
    { icon: <LineChart className="w-6 h-6 text-purple-500" />, title: "Data-Driven Insights", desc: "Generates measurable data for policymakers and organizations to track impact." },
    { icon: <Users className="w-6 h-6 text-teal-600" />, title: "Community & Brand Value", desc: "Fosters green reputations and loyalty among eco-conscious consumers." },
    { icon: <Flame className="w-6 h-6 text-red-500" />, title: "Supports Climate Goals", desc: "Aligns with global efforts like net-zero emissions and the Paris Agreement." }
  ];
  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        await provider.send('eth_requestAccounts', []); 
        // Request accounts from MetaMask
        const signer = await provider.getSigner();
        console.log(signer) 
        console.log("Tokens Provided: ", tokensProvided);
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contract);
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);
      } else {
        console.error('Ethereum provider is not available');
      }
    }
    init();
  }, []);

  const handleClaim = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected");
        return;
      }
  
      // Connect to MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
  
      // Create contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log(tokensProvided);
      // Call the function
      const tx = await contract.claimTokens(tokensProvided);
      console.log("Transaction submitted:", tx.hash);
  
      await tx.wait();
      console.log("Transaction confirmed:", tx.hash);
      
      alert("✅ Tokens minted and transferred successfully!");
    } catch (error) {
      console.error("Error minting tokens:", error);
      alert("❌ Transaction failed");

    }
   
  };


  return (
    <div className="bg-gradient-to-r from-green-200 to-green-500 text-white min-h-screen p-6 font-sans">
    <div className="bg-white py-10 px-4 sm:px-10 lg:px-20 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-teal-700 text-center mb-8">
        🌱 Advantages of Green Tokens
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg shadow hover:shadow-md transition duration-300 bg-green-200">
            <div className="p-2 bg-green-200 rounded-full shadow-inner">{item.icon}</div>
            <div>
              <h3 className="font-semibold text-green-900 text-lg">{item.title}</h3>
              <p className="text-sm text-green-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>


    <div className="bg-gray-100 min-h-screen p-6 font-sans text-gray-800">
  <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">
    Token Distribution Chart
  </h1>

  <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-md shadow-sm mb-6">
    <p className="text-gray-800 text-base sm:text-lg font-medium text-center">
      <span className="font-semibold text-teal-700 ">Green Tokens</span> can be used to redeem eco-friendly products, services, or carbon credits.
    </p>
    <p className="text-gray-700 text-base sm:text-lg mt-1 text-center">
      They may also be traded in sustainability marketplaces or used for discounts on partner platforms.
      1% decrease = 10 tokens.
    </p>
    <p className="text-gray-700 text-base sm:text-lg mt-1 text-center">
      1% decrease = 10 tokens.
    </p>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
      <thead>
        <tr className="bg-teal-600 text-white text-lg">
          <th className="py-4 px-6 text-left">Percentage Decrease</th>
          <th className="py-4 px-6 text-left">Tokens Provided</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            className={`${
              idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'
            } hover:bg-teal-100 transition-colors duration-200`}
          >
            <td className="py-3 px-6 font-medium">{row.percentageDecrease}</td>
            <td className="py-3 px-6 font-medium">{row.tokensProvided}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
<div className="text-center mt-6">
        <button
          onClick={handleClaim}
          disabled={!hasDecreased}
          className={`px-6 py-3 rounded-md font-semibold transition-colors duration-300 ${
            hasDecreased
              ? 'bg-teal-600 text-white hover:bg-teal-700'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          Claim Green Tokens
        </button>
        {!hasDecreased && (
          <p className="mt-2 text-sm text-red-600">⚠ Reduce your carbon footprint to claim tokens.</p>
        )}
      </div>
</div>
  );
}

export default GreenToken;