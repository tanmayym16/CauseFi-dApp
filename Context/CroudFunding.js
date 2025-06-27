import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { CrowdFundingAddress, CrowdFundingABI } from "./contants";

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
  const titleData = "Crowd Funding Contract";
  const [currentAccount, setCurrentAccount] = useState("");
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [success, setSuccess] = useState("");

  const createCampaign = async (campaign) => {
    const { title, description, amount, deadline, image } = campaign;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.createCampaign(
        currentAccount,
        title,
        description,
        ethers.utils.parseUnits(amount, 18),
        Math.floor(new Date(deadline).getTime() / 1000),
        image
      );

      await transaction.wait();

      setOpenSuccess(true);
      setSuccess("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
      setOpenError(true);
      setError("Error creating campaign. Please try again.");
    }
  };

  // Demo campaigns for all listings
  const demoCampaigns = [
    {
      owner: "0xDEMO000000000000000000000000000000000004",
      title: "Solar Village Project – Lighting Lives with the Power of the Sun",
      description: `Imagine living in a village where the sun sets — and everything comes to a halt. Children can't study, small businesses close early, and families cook meals in darkness using unsafe fuels. This is the daily reality for hundreds of rural communities across Rajasthan, India.\n\nThe Solar Village Project aims to change that — by bringing sustainable, solar-powered electricity to one such remote village. With your support, we will install solar panels and microgrid systems in homes, schools, and community spaces, enabling villagers to thrive with reliable, clean energy.\n\nThis campaign is more than just an energy solution — it's about:\n\n🌱 Empowering women to start home-based businesses\n\n📚 Giving children the ability to study after sunset\n\n🏥 Supporting local clinics with power for basic medical devices\n\n🌍 Reducing carbon emissions and dependency on kerosene and diesel\n\nOur team has already conducted a full energy audit and partnered with local technicians to ensure the systems are maintained long-term. We are committed to transparency, and every major milestone will be shared with our supporters through on-chain updates and photos.\n\nWith a fundraising target of 25 ETH, we plan to:\n\nInstall 50 home solar kits\n\nPower 1 school and 1 local clinic\n\nTrain 5 local technicians for long-term maintenance\n\nProvide emergency backup batteries\n\nThis is your chance to be part of a meaningful, measurable, and decentralized impact movement. Every contribution counts. Every wallet can light up a home.\n\nLet's build a brighter tomorrow — one village at a time. ☀️`,
      target: "25",
      deadline: Math.floor(new Date("2025-12-31").getTime() / 1000),
      amountCollected: "0",
      pId: 3,
      image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&w=800&q=80",
      category: "Environment",
    },
    {
      owner: "0xDEMO000000000000000000000000000000000005",
      title: "Clean Water for All: Borewell Initiative",
      description: `Millions of people lack access to clean drinking water. Our Borewell Initiative aims to drill and maintain deep borewells in drought-prone villages of Sub-Saharan Africa.\n\nWith your help, we will provide safe, sustainable water sources for over 2,000 families, reducing waterborne diseases and empowering women and children who walk miles daily for water.\n\nYour support will fund:\n- 3 new borewells\n- Water education workshops\n- Local maintenance training\n\nEvery drop counts!`,
      target: "12",
      deadline: Math.floor(new Date("2025-10-01").getTime() / 1000),
      amountCollected: "0",
      pId: 4,
      image: "https://images.pexels.com/photos/593324/pexels-photo-593324.jpeg?auto=compress&w=800&q=80",
      category: "Health",
    },
    {
      owner: "0xDEMO000000000000000000000000000000000006",
      title: "Girls Code: Rural Tech Bootcamp",
      description: `Help us bridge the digital divide! Girls Code Bootcamp brings coding and digital literacy to girls in rural Nepal.\n\nWe provide laptops, internet, and a 6-week immersive curriculum, empowering the next generation of female tech leaders.\n\nYour donation will:\n- Sponsor 30 students\n- Provide 15 laptops\n- Fund 2 local instructors\n\nInvest in girls. Invest in the future.`,
      target: "8",
      deadline: Math.floor(new Date("2025-09-15").getTime() / 1000),
      amountCollected: "0",
      pId: 5,
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=800&q=80",
      category: "Education",
    },
    {
      owner: "0xDEMO000000000000000000000000000000000007",
      title: "Art for Change: Community Mural Festival",
      description: `Art transforms communities! Join our Mural Festival to bring color, hope, and unity to urban neighborhoods in São Paulo, Brazil.\n\nWe will collaborate with local artists and youth to create 10 large-scale murals, host art workshops, and celebrate cultural diversity.\n\nFunds will cover:\n- Artist materials\n- Workshop facilitation\n- Community celebration event\n\nPaint a brighter future with us!`,
      target: "6",
      deadline: Math.floor(new Date("2025-11-20").getTime() / 1000),
      amountCollected: "0",
      pId: 6,
      image: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&w=800&q=80",
      category: "Art",
    },
    {
      owner: "0xDEMO000000000000000000000000000000000001",
      title: "Tech for Good: Laptops for Students",
      description: "Help us provide refurbished laptops to underprivileged students to support their online learning.",
      target: "10",
      deadline: Math.floor(new Date("2024-12-31").getTime() / 1000),
      amountCollected: "4.5",
      pId: 0,
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=800&q=80",
      category: "Education",
    },
    {
      owner: "0xDEMO000000000000000000000000000000000002",
      title: "Community Art Project: Mural Painting",
      description: "Fund our community mural project to beautify the neighborhood and bring people together through art.",
      target: "5",
      deadline: Math.floor(new Date("2024-11-30").getTime() / 1000),
      amountCollected: "2.1",
      pId: 1,
      image: "https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&w=800&q=80",
      category: "Art",
    },
    {
      owner: "0xDEMO000000000000000000000000000000000003",
      title: "Eco-Friendly Initiative: Urban Garden",
      description: "Support the creation of a community urban garden to promote sustainable living and access to fresh produce.",
      target: "8",
      deadline: Math.floor(new Date("2025-01-15").getTime() / 1000),
      amountCollected: "6.8",
      pId: 2,
      image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&w=800&q=80",
      category: "Environment",
    },
  ];

  const getCampaigns = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const campaigns = await contract.getCampaigns();
      const parsedCampaings = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        pId: i,
        image: campaign.image,
      }));

      // If there are real campaigns, return only them. Otherwise, show demo.
      return parsedCampaings.length > 0 ? parsedCampaings : demoCampaigns;
    } catch (error) {
      console.error("Error getting campaigns:", error);
      return demoCampaigns;
    }
  };

  const getUserCampaigns = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const allCampaigns = await contract.getCampaignsByOwner(currentAccount);

      const parsedCampaings = allCampaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        pId: i,
      }));

      // Return only the real campaigns
      return parsedCampaings;
    } catch (error) {
      console.error("Error getting user campaigns:", error);
      // Return an empty array on error
      return [];
    }
  };

  const getCampaign = async (pId) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const campaign = await contract.getCampaign(pId);

      const parsedCampaing = {
        owner: campaign[0],
        title: campaign[1],
        description: campaign[2],
        target: ethers.utils.formatEther(campaign[3].toString()),
        deadline: campaign[4].toNumber(),
        amountCollected: ethers.utils.formatEther(campaign[5].toString()),
        image: campaign[6],
        pId,
      };

      // Return only the real campaigns
      return parsedCampaing;
    } catch (error) {
      console.error(`Error getting campaign ${pId}:`, error);
      // Return an empty object on error
      return {};
    }
  };

  const getDonatedCampaigns = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const donatedCampaigns = await contract.getDonatedCampaigns();

      const parsedCampaings = donatedCampaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        pId: i,
      }));

      // Return only the real campaigns
      return parsedCampaings;
    } catch (error) {
      console.error("Error getting donated campaigns:", error);
      // Return an empty array on error
      return [];
    }
  };

  const donate = async (pId, amount) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const campaignData = await contract.donateToCampaign(pId, {
        value: ethers.utils.parseEther(amount),
      });

      await campaignData.wait();
      location.reload();

      return campaignData;
    } catch (error) {
      console.error(`Error donating to campaign ${pId}:`, error);
      setOpenError(true);
      setError("Error making donation. Please try again.");
    }
  };

  const getDonations = async (pId) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const donations = await contract.getDonators(pId);
      const numberOfDonations = donations[0].length;

      const parsedDonations = [];

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        });
      }

      return parsedDonations;
    } catch (error) {
      console.error(`Error getting donations for campaign ${pId}:`, error);
      return [];
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        setOpenError(true);
        setError("Install MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Account Found");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setOpenError(true);
        setError("Install MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      setOpenSuccess(true);
      setSuccess("Wallet connected successfully.");
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setOpenError(true);
      setError("Error while connecting to wallet. Please try again.");
    }
  };

  const disconnectWallet = () => {
    setCurrentAccount("");
    setOpenSuccess(true);
    setSuccess("Wallet disconnected successfully.");
  };

  return (
    <CrowdFundingContext.Provider
      value={{
        titleData,
        currentAccount,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        getCampaign,
        getDonatedCampaigns,
        donate,
        getDonations,
        connectWallet,
        disconnectWallet,
        error,
        openError,
        setOpenError,
        success,
        openSuccess,
        setOpenSuccess,
        demoCampaigns
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};
