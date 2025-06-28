import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { CrowdFundingContext } from '../Context/CroudFunding';
import { Card, NavBar, Footer, Loader } from '../Components';

export default function Project() {
  const router = useRouter();
  const { getCampaigns, currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [allcampaign, setAllcampaign] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const allData = await getCampaigns();
      // Show latest campaign first
      setAllcampaign(allData.slice().reverse());
      setIsLoading(false);
    };
    fetchData();
  }, [currentAccount, connectWallet]);

  return (
    <div className="bg-[#13131a] min-h-screen text-white">
      <NavBar connectWallet={connectWallet} currentAccount={currentAccount} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">All Campaigns</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : allcampaign.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allcampaign.map((campaign) => (
              <Card
                key={campaign.pId}
                {...campaign}
                handleClick={() => router.push(`/campaign/${campaign.pId}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No campaigns found</h3>
            <p className="text-[#a99abc] mb-6">No campaigns are currently available.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 