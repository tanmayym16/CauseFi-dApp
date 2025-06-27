import React, { useState, useEffect } from "react";

import { Close } from "../Components/index";

const PopUp = ({ setOpenModal, getDonations, donate, donateCampaign }) => {
  const [amount, setAmount] = useState("");
  const [allDonationData, setallDonationData] = useState();

  const createDonation = async () => {
    try {
      const data = await donate(donateCampaign.pId, amount);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const donationsData = await getDonations(donateCampaign.pId);
      setallDonationData(donationsData);
    };
    fetchData();
  }, [donateCampaign, donate]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" role="dialog" aria-modal="true" aria-labelledby="popup-title">
        <div className="relative w-full max-w-lg mx-auto my-6 sm:my-12">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 id="popup-title" className="text-3xl font-semibold">{donateCampaign.title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                aria-label="Close donation modal"
                onClick={() => setOpenModal(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none" aria-hidden="true">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                {donateCampaign.description}
              </p>

              <label htmlFor="donation-amount" className="block text-sm font-medium text-gray-700 mb-1">Donation Amount</label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                placeholder="amount"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                id="donation-amount"
                name="donation-amount"
                autoFocus
                aria-label="Donation amount"
              />

              {allDonationData?.map((donate, i) => (
                <p key={i} className="my-4 text-slate-500 text-lg leading-relaxed">
                  {i + 1}: {donate.donation} {""}
                  {donate.donator.slice(0, 35)}
                </p>
              ))}
            </div>

            {/*footer*/}
            <div className="flex flex-col sm:flex-row items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-2">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 w-full sm:w-auto"
                type="button"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
              <button
                className="background-main-color text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 w-full sm:w-auto"
                type="button"
                onClick={() => createDonation()}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default PopUp;
