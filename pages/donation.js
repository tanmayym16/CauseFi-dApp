import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import {
  NavBar,
  Footer,
  Card,
  Loader,
  Error,
  Success,
} from "../Components";
import { CrowdFundingContext } from "../Context/CroudFunding";

const donation = () => {
  const {
    currentAccount,
    getDonatedCampaigns,
    error,
    openError,
    setOpenError,
  } = useContext(CrowdFundingContext);

  const [isLoading, setIsLoading] = useState(true);
  const [donatedCampaigns, setDonatedCampaigns] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDonatedCampaigns = async () => {
      if (!currentAccount) {
        setIsLoading(false);
        setOpenError(true);
        return;
      }
      setIsLoading(true);
      const donatedData = await getDonatedCampaigns();
      setDonatedCampaigns(donatedData);
      setIsLoading(false);
    };

    fetchDonatedCampaigns();
  }, [currentAccount]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <NavBar />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">My Donations</h1>
        {isLoading ? (
          <div className="text-center py-10">
            <Loader />
          </div>
        ) : !currentAccount ? (
          <Error
            error="Please connect your wallet to view your donations."
            openError={true}
            setOpenError={setOpenError}
          />
        ) : donatedCampaigns.length === 0 ? (
          <p className="text-center text-lg">You have not donated to any campaigns yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donatedCampaigns.map((campaign, index) => (
              <Card
                key={index}
                id={campaign.pId}
                title={campaign.title}
                description={campaign.description}
                target={campaign.target}
                deadline={campaign.deadline}
                amountCollected={campaign.amountCollected}
                owner={campaign.owner}
                image={campaign.image}
                handleClick={() => router.push(`/campaign/${campaign.pId}`)}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default donation; 