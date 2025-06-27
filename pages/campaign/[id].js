import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import { NavBar, Footer, Loader } from "../../Components";
import { CrowdFundingContext } from "../../Context/CroudFunding";

const CampaignDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { getCampaign, donate, getDonations, currentAccount } =
    useContext(CrowdFundingContext);

  const [isLoading, setIsLoading] = useState(true);
  const [campaign, setCampaign] = useState({});
  const [donators, setDonators] = useState([]);
  const [donationAmount, setDonationAmount] = useState("");

  const percentage = campaign.target
    ? Math.min(
        (
          (parseFloat(campaign.amountCollected) /
            parseFloat(campaign.target)) *
          100
        ).toFixed(2),
        100
      )
    : 0;

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      if (id) {
        setIsLoading(true);
        const campaignData = await getCampaign(id);
        const donationsData = await getDonations(id);
        setCampaign(campaignData);
        setDonators(donationsData);
        setIsLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [id, currentAccount]);

  const handleDonate = async () => {
    if (donationAmount) {
      setIsLoading(true);
      await donate(id, donationAmount);
      router.reload();
    }
  };

  const daysLeft = (deadline) => {
    const difference = new Date(deadline * 1000).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    if (remainingDays <= 0) {
      return "Expired";
    }
    return remainingDays.toFixed(0) + " Days Left";
  };

  return (
    <div className="bg-[#13131a] min-h-screen text-white">
      <NavBar />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {campaign.title}
          </h1>

          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <div className="flex-1">
              <img
                src={
                  campaign.image && campaign.image.trim() !== ""
                    ? campaign.image
                    : id === "0"
                    ? "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=800&q=80"
                    : "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=compress&w=800&q=80"
                }
                alt={campaign.title}
                className="w-full h-[410px] object-cover rounded-xl"
              />
            </div>

            <div className="lg:w-[450px] flex flex-col justify-between">
              <div className="bg-[#1c1c24] rounded-lg p-5">
                <h3 className="font-bold text-2xl mb-4">Fund</h3>
                <div className="mb-4">
                  <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                    <div
                      className="absolute h-full bg-[#4acd8d]"
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-2xl text-[#4acd8d]">
                      {campaign.amountCollected} ETH
                    </h4>
                    <span className="text-gray-400">
                      Raised of {campaign.target} ETH
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl">
                      {daysLeft(campaign.deadline)}
                    </h4>
                    <span className="text-gray-400">Remaining</span>
                  </div>
                </div>
                <input
                  type="number"
                  placeholder="0.1 ETH"
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full p-3 rounded bg-[#3a3a43] text-white my-4"
                />
                <button
                  onClick={handleDonate}
                  className="w-full bg-[#8c6dfd] hover:bg-[#7b5be1] text-white font-bold py-3 px-4 rounded"
                >
                  Fund Campaign
                </button>
              </div>
              <div className="mt-4 bg-[#1c1c24] rounded-lg p-5">
                <h3 className="font-bold text-2xl mb-4">Donators</h3>
                {donators.length > 0 ? (
                  <ul>
                    {donators.map((donator, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center bg-[#2c2f32] p-2 rounded-lg mb-2"
                      >
                        <span className="truncate">{donator.donator}</span>
                        <span className="font-bold text-[#8c6dfd]">
                          {donator.donation} ETH
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No donations yet. Be the first one!</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-[#1c1c24] rounded-lg p-5">
              <h3 className="font-bold text-2xl mb-4">Story</h3>
              <p className="text-gray-300 leading-relaxed">
                {id === "0"
                  ? `In a world where technology is the bridge to opportunity, our mission is to empower underprivileged students by providing them with refurbished laptops. Many bright minds are held back simply because they lack access to the digital tools needed for modern education. With your support, we can collect, refurbish, and distribute laptops to students in need, opening doors to online learning, skill development, and a brighter future. Join us in making education accessible for all—one laptop at a time.

                  Why is this important? In today's digital age, education is increasingly dependent on technology. Students without access to a computer are at a severe disadvantage, unable to participate in online classes, complete assignments, or develop essential digital skills. By contributing to this campaign, you are not just donating a device—you are giving a student the chance to learn, grow, and pursue their dreams.

                  How will your funds be used? Every donation goes directly towards sourcing, refurbishing, and delivering laptops to students who need them most. We partner with local organizations and schools to identify recipients and ensure that each laptop finds a deserving home. Your generosity will help cover the costs of hardware, software, repairs, and training, making a tangible difference in the lives of countless young learners.

                  Together, we can bridge the digital divide and create a future where every student has the tools they need to succeed. Thank you for believing in the power of education and for supporting our mission to make technology accessible to all.`
                  : id === "1"
                  ? `Art has the power to transform communities, inspire hope, and bring people together. Our Community Mural Project aims to revitalize public spaces by creating vibrant, large-scale murals that reflect the spirit and diversity of our neighborhood. With the help of local artists, volunteers, and supporters like you, we can turn blank walls into canvases of creativity and pride.

                  Why support public art? Murals do more than beautify—they tell stories, celebrate culture, and foster a sense of belonging. They can deter vandalism, attract visitors, and spark important conversations. By funding this project, you are investing in a more colorful, connected, and welcoming community for everyone.

                  How will your contribution help? Your donations will cover the costs of paint, supplies, artist stipends, and community workshops. We believe in involving residents at every step, from design to execution, ensuring that the final artwork truly represents our collective vision. Every brushstroke is a step toward a brighter, more inclusive neighborhood.

                  Join us in making art accessible to all. Together, we can create lasting change—one mural at a time.`
                  : id === "2"
                  ? `Imagine a city where fresh vegetables and green spaces are just a short walk away for everyone. Our Urban Garden Initiative is dedicated to transforming vacant lots into thriving community gardens, providing access to healthy food, environmental education, and a place for neighbors to connect.

                  Why urban gardens? In many urban areas, access to fresh produce is limited, leading to health disparities and food insecurity. Community gardens not only address these issues but also promote sustainability, biodiversity, and mental well-being. They serve as outdoor classrooms, gathering spots, and sources of local pride.

                  How will your donation make a difference? Funds raised will go toward soil, seeds, tools, raised beds, and educational programs for children and adults. We'll work with local schools, nonprofits, and residents to ensure the gardens are maintained and accessible to all. Your support will help us plant the seeds for a healthier, greener, and more connected community.

                  Be a part of the movement for urban sustainability. Together, we can grow more than just food—we can grow hope, knowledge, and community spirit.`
                  : id === "3"
                  ? `Imagine living in a village where the sun sets — and everything comes to a halt. Children can't study, small businesses close early, and families cook meals in darkness using unsafe fuels. This is the daily reality for hundreds of rural communities across Rajasthan, India.

The Solar Village Project aims to change that — by bringing sustainable, solar-powered electricity to one such remote village. With your support, we will install solar panels and microgrid systems in homes, schools, and community spaces, enabling villagers to thrive with reliable, clean energy.

This campaign is more than just an energy solution — it's about:

🌱 Empowering women to start home-based businesses

📚 Giving children the ability to study after sunset

🏥 Supporting local clinics with power for basic medical devices

🌍 Reducing carbon emissions and dependency on kerosene and diesel

Our team has already conducted a full energy audit and partnered with local technicians to ensure the systems are maintained long-term. We are committed to transparency, and every major milestone will be shared with our supporters through on-chain updates and photos.

With a fundraising target of 25 ETH, we plan to:

Install 50 home solar kits

Power 1 school and 1 local clinic

Train 5 local technicians for long-term maintenance

Provide emergency backup batteries

This is your chance to be part of a meaningful, measurable, and decentralized impact movement. Every contribution counts. Every wallet can light up a home.

Let's build a brighter tomorrow — one village at a time. ☀️`
                  : id === "4"
                  ? `Millions of people lack access to clean drinking water. Our Borewell Initiative aims to drill and maintain deep borewells in drought-prone villages of Sub-Saharan Africa.

With your help, we will provide safe, sustainable water sources for over 2,000 families, reducing waterborne diseases and empowering women and children who walk miles daily for water.

Your support will fund:
- 3 new borewells
- Water education workshops
- Local maintenance training

Every drop counts!`
                  : campaign.description}
              </p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CampaignDetails; 