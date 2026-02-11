import React, { useContext, createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CrowdFundingABI from './CrowdFunding.json';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [address, setAddress] = useState(null);
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);

    // Contract Address from deployment
    const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

    // Connect to Wallet
    const connect = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAddress(accounts[0]);

                const provider = new ethers.BrowserProvider(window.ethereum);
                setProvider(provider);

                const signer = await provider.getSigner();
                const contractInstance = new ethers.Contract(contractAddress, CrowdFundingABI.abi, signer);
                setContract(contractInstance);

                return accounts[0];
            } catch (error) {
                console.error("Connection failed", error);
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    // Create Campaign
    const publishCampaign = async (form) => {
        try {
            if (!contract) return console.log("Contract not loaded");

            const data = await contract.createCampaign(
                address, // owner
                form.title, // title
                form.description, // description
                ethers.parseUnits(form.target, 18), // target in ETH
                Math.floor(new Date(form.deadline).getTime() / 1000), // deadline timestamp
                form.image // image URL
            );

            console.log("Contract call success", data);
            await data.wait();
            console.log("Transaction success");
        } catch (error) {
            console.error("Contract call failure", error);
        }
    };

    // Get Campaigns
    const getCampaigns = async () => {
        try {
            // If no wallet connected, use a read-only provider (e.g. JsonRpcProvider for local hardhat)
            // For now we assume user connects wallet to view. Or we could use a public RPC.
            // But let's check if contract is set. If not, maybe use a default provider.

            let fetchContract = contract;
            if (!fetchContract) {
                // Fallback for read-only
                const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
                fetchContract = new ethers.Contract(contractAddress, CrowdFundingABI.abi, provider);
            }

            const campaigns = await fetchContract.getCampaigns();

            const parsedCampaigns = campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.formatEther(campaign.target.toString()),
                deadline: Number(campaign.deadline),
                amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
                image: campaign.image,
                pId: i
            }));

            return parsedCampaigns;
        } catch (error) {
            console.log("Error fetching campaigns", error);
            return [];
        }
    };

    const getDonators = async (pId) => {
        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonations;
    }

    const donate = async (pId, amount) => {
        if (!contract) return;
        const data = await contract.donateToCampaign(pId, { value: ethers.parseEther(amount) });
        return await data.wait();
    }

    // Check if wallet is already connected on load
    useEffect(() => {
        const checkConnection = async () => {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    connect();
                }
            }
        }
        checkConnection();
    }, []);

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns,
                getDonators,
                donate
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
