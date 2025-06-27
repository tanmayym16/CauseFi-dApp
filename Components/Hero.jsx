import React, { useState, useContext } from "react";
import { CrowdFundingContext } from "../Context/CroudFunding";
import { Loader, Logo } from "./";

const Hero = ({ titleData, createCampaign }) => {
  const { currentAccount, setOpenError, setError } =
    useContext(CrowdFundingContext);
  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
    image: "",
  });

  // Calculate tomorrow's date in YYYY-MM-DD format
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const createNewCampaign = async (e) => {
    e.preventDefault();
    if (!currentAccount) {
      setOpenError(true);
      setError("Please connect your wallet to create a campaign.");
      return;
    }
    setIsLoading(true);
    try {
      await createCampaign(campaign);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative bg-[#13131a]">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-4">
              <Logo />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              CauseFi: Fundraising on the Blockchain
            </h1>
            <p className="text-lg text-[#808191] mb-8">
              From creative projects to social causes, bring your ideas to life
              with the power of decentralized crowdfunding.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="bg-[#1c1c24] rounded-lg shadow-xl p-6 sm:p-8">
              <h3 className="mb-6 text-xl font-semibold text-center text-white">
                Start a Campaign
              </h3>
              {isLoading && <Loader />}
              <form onSubmit={createNewCampaign} aria-label="Create a new campaign">
                <div className="grid grid-cols-1 gap-4">
                  <label htmlFor="campaign-title" className="block text-sm font-medium text-gray-200">Campaign Title</label>
                  <input
                    id="campaign-title"
                    onChange={(e) =>
                      setCampaign({ ...campaign, title: e.target.value })
                    }
                    placeholder="Campaign Title"
                    required
                    type="text"
                    className="w-full bg-[#3a3a43] text-white rounded-md p-3"
                    aria-label="Campaign Title"
                  />
                  <label htmlFor="campaign-description" className="block text-sm font-medium text-gray-200">Campaign Description</label>
                  <textarea
                    id="campaign-description"
                    onChange={(e) =>
                      setCampaign({ ...campaign, description: e.target.value })
                    }
                    placeholder="Campaign Description"
                    required
                    rows="3"
                    className="w-full bg-[#3a3a43] text-white rounded-md p-3"
                    aria-label="Campaign Description"
                  ></textarea>
                  <label htmlFor="campaign-image" className="block text-sm font-medium text-gray-200">Image URL</label>
                  <input
                    id="campaign-image"
                    onChange={(e) =>
                      setCampaign({ ...campaign, image: e.target.value })
                    }
                    placeholder="Image URL"
                    required
                    type="url"
                    className="w-full bg-[#3a3a43] text-white rounded-md p-3"
                    aria-label="Image URL"
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label htmlFor="campaign-amount" className="block text-sm font-medium text-gray-200">Target (ETH)</label>
                      <input
                        id="campaign-amount"
                        onChange={(e) =>
                          setCampaign({ ...campaign, amount: e.target.value })
                        }
                        placeholder="Target (ETH)"
                        required
                        type="number"
                        step="0.01"
                        className="w-full bg-[#3a3a43] text-white rounded-md p-3"
                        aria-label="Target (ETH)"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="campaign-deadline" className="block text-sm font-medium text-gray-200">Deadline</label>
                      <input
                        id="campaign-deadline"
                        onChange={(e) =>
                          setCampaign({ ...campaign, deadline: e.target.value })
                        }
                        required
                        type="date"
                        min={getTomorrowDate()}
                        className="w-full bg-[#3a3a43] text-white rounded-md p-3"
                        aria-label="Deadline"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 font-medium text-white transition-colors duration-200 rounded-md bg-[#8c6dfd] hover:bg-[#7b5be1] focus:outline-none"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Campaign"}
                  </button>
                </div>
                {!currentAccount && (
                  <p className="mt-4 text-xs text-center text-red-400">
                    Please connect your wallet to create a campaign.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
