import React, { useEffect, useContext, useState } from "react";
import { CrowdFundingContext } from "../Context/CroudFunding";
import { NavBar, Footer, Loader, Card } from "../Components";
import { useRouter } from "next/router";

const Members = () => {
  const { getCampaigns } = useContext(CrowdFundingContext);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      const allCampaigns = await getCampaigns();
      setCampaigns(allCampaigns);
      setIsLoading(false);
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      <NavBar />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">All Campaigns</h1>
        {isLoading ? (
          <div className="text-center py-10"><Loader /></div>
        ) : campaigns.length === 0 ? (
          <p className="text-center text-lg text-white">No campaigns found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => (
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

export default Members; 