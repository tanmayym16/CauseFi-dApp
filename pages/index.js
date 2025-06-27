import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { CrowdFundingContext } from "../Context/CroudFunding";
import { Hero, Card, PopUp, Footer, NavBar, Loader } from "../Components";

const Index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
    currentAccount,
    connectWallet,
  } = useContext(CrowdFundingContext);

  const [allcampaign, setAllcampaign] = useState([]);
  const [usercampaign, setUsercampaign] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const allData = await getCampaigns();
      setAllcampaign(allData);
      if (currentAccount) {
        const userData = await getUserCampaigns();
        setUsercampaign(userData);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [currentAccount, connectWallet]);

  //POPUP MODAL
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  return (
    <div className="layout-container flex h-full grow flex-col">
      <NavBar connectWallet={connectWallet} currentAccount={currentAccount} />
      <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <Hero titleData={titleData} createCampaign={createCampaign} />

          {/* How It Works Section */}
          <section className="my-10 bg-[#1c1c24] rounded-xl p-6 sm:p-10 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="mb-2 text-4xl">📝</div>
                <h3 className="font-semibold mb-1">Create a Campaign</h3>
                <p className="text-[#a99abc]">Sign in, fill out your campaign details, and launch your cause in minutes.</p>
              </div>
              <div>
                <div className="mb-2 text-4xl">🤝</div>
                <h3 className="font-semibold mb-1">Share & Fundraise</h3>
                <p className="text-[#a99abc]">Share your campaign link and receive donations from supporters worldwide.</p>
              </div>
              <div>
                <div className="mb-2 text-4xl">🎉</div>
                <h3 className="font-semibold mb-1">Make an Impact</h3>
                <p className="text-[#a99abc]">Withdraw funds and update your backers as your project progresses.</p>
              </div>
            </div>
          </section>

          {/* Featured Campaigns Section */}
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Featured Campaigns</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {allcampaign.slice(0, 2).map((campaign) => (
                <Card
                  key={campaign.pId}
                  {...campaign}
                  handleClick={() => router.push(`/campaign/${campaign.pId}`)}
                />
              ))}
            </div>
          </section>

          {/* Categories Section */}
          <section className="my-10 bg-[#1c1c24] rounded-xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Education', 'Health', 'Community', 'Tech', 'Environment', 'Art'].map((cat) => (
                <span key={cat} className="px-4 py-2 rounded-full bg-[#8c6dfd] text-white font-semibold cursor-pointer hover:bg-[#7b5be1] transition">{cat}</span>
              ))}
            </div>
          </section>

          {/* All Listed Campaigns Section (existing) */}
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            All Listed Campaigns
          </h2>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 p-4">
                {allcampaign.map((campaign) => (
                  <Card
                    key={campaign.pId}
                    {...campaign}
                    handleClick={() => router.push(`/campaign/${campaign.pId}`)}
                  />
                ))}
              </div>
              <div className="flex justify-center">
                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2f273a] text-white text-sm font-bold leading-normal tracking-[0.015em] grow">
                    <span className="truncate">Previous</span>
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2f273a] text-white text-sm font-bold leading-normal tracking-[0.015em] grow">
                    <span className="truncate">Next</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Impact/Stats Section */}
          <section className="my-10 bg-[#1c1c24] rounded-xl p-6 sm:p-10 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Impact</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">7</div>
                <div className="text-[#a99abc]">Campaigns</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{Number(allcampaign.reduce((sum, c) => sum + Number(c.amountCollected || 0), 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })} ETH</div>
                <div className="text-[#a99abc]">Raised</div>
              </div>
              <div>
                <div className="text-3xl font-bold">7</div>
                <div className="text-[#a99abc]">Donors</div>
              </div>
              <div>
                <div className="text-3xl font-bold">7</div>
                <div className="text-[#a99abc]">Your Campaigns</div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">What Our Users Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#1c1c24] rounded-xl p-6">
                <p className="text-[#a99abc] mb-2">“CauseFi made it so easy to raise funds for my community project. The support was incredible!”</p>
                <div className="font-bold text-white">— Priya S.</div>
              </div>
              <div className="bg-[#1c1c24] rounded-xl p-6">
                <p className="text-[#a99abc] mb-2">“I love how transparent and fast the donation process is. Highly recommended!”</p>
                <div className="font-bold text-white">— Alex T.</div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="my-10 bg-[#1c1c24] rounded-xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-[#23232d] rounded p-4">
                <summary className="font-semibold text-white cursor-pointer">How do I start a campaign?</summary>
                <p className="text-[#a99abc] mt-2">Connect your wallet, click 'Start a Campaign', and fill out the form with your project details.</p>
              </details>
              <details className="bg-[#23232d] rounded p-4">
                <summary className="font-semibold text-white cursor-pointer">Is there a fee to use CauseFi?</summary>
                <p className="text-[#a99abc] mt-2">No, CauseFi does not charge any platform fees. Only standard blockchain transaction fees apply.</p>
              </details>
              <details className="bg-[#23232d] rounded p-4">
                <summary className="font-semibold text-white cursor-pointer">How do I withdraw funds?</summary>
                <p className="text-[#a99abc] mt-2">Once your campaign reaches its goal, you can withdraw funds directly to your wallet.</p>
              </details>
              <details className="bg-[#23232d] rounded p-4">
                <summary className="font-semibold text-white cursor-pointer">Can I donate without a wallet?</summary>
                <p className="text-[#a99abc] mt-2">Currently, a crypto wallet is required to donate on CauseFi.</p>
              </details>
            </div>
          </section>

          {/* Contact Us Section */}
          <section className="my-10 bg-[#1c1c24] rounded-xl p-6 sm:p-10 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
            <div className="max-w-xl mx-auto space-y-4 text-center">
              <div>
                <span className="block text-lg font-medium mb-1">📞 Call us on:</span>
                <span className="text-[#8c6dfd] font-bold text-xl">+91 90797 78688</span>
              </div>
              <div>
                <span className="block text-lg font-medium mb-1">📍 Location:</span>
                <span className="text-[#a99abc]">Jaipur, Rajasthan</span>
              </div>
              <div>
                <span className="block text-lg font-medium mb-1">🔗 LinkedIn:</span>
                <a href="https://www.linkedin.com/in/tanmay-mathur-825a9624b/" target="_blank" rel="noopener noreferrer" className="text-[#8c6dfd] underline">@tanmay-mathur-825a9624b</a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {openModal && (
        <PopUp
          setOpenModal={setOpenModal}
          getDonations={getDonations}
          donate={donate}
          donateCampaign={donateCampaign}
        />
      )}

      <Footer />
    </div>
  );
};

export default Index;
