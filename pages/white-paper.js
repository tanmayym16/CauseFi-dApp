import React from 'react';

// INTERNAL IMPORT
import { NavBar, Footer } from '../Components';

const WhitePaper = () => (
  <div className="bg-[#0D0D0D] text-[#E0E0E0] min-h-screen font-sans">
    <NavBar />
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Our Vision: The Crypto King White Paper
        </h1>
        <div className="bg-[#1c1c24] p-8 rounded-2xl shadow-lg">
          <div className="prose prose-invert lg:prose-xl mx-auto">
            <h2 className="text-3xl font-bold border-b-2 border-purple-500 pb-2 mb-4">Introduction</h2>
            <p className="text-lg leading-relaxed">
              This document outlines the vision, technology, and roadmap for the
              Crypto King Crowd Funding (CK) platform. Our mission is to
              revolutionize fundraising by providing a decentralized, transparent,
              and secure platform powered by blockchain technology.
            </p>

            <h2 className="text-3xl font-bold border-b-2 border-purple-500 pb-2 mt-8 mb-4">The Problem We Solve</h2>
            <p className="text-lg leading-relaxed">
              Traditional crowdfunding platforms suffer from several drawbacks,
              including high fees, a lack of transparency, and the ever-present
              risk of fraud. Project creators often face significant hurdles in
              accessing a global pool of investors, while backers have limited
              visibility into how their funds are being utilized.
            </p>

            <h2 className="text-3xl font-bold border-b-2 border-purple-500 pb-2 mt-8 mb-4">Our Solution: The CK Platform</h2>
            <p className="text-lg leading-relaxed">
              The CK platform addresses these challenges head-on by leveraging the
              power of smart contracts on the Ethereum blockchain. Key features include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>
                <strong>Radical Decentralization:</strong> By removing all
                intermediaries, we drastically reduce fees and give project
                creators full, sovereign control over their campaigns.
              </li>
              <li>
                <strong>Unyielding Transparency:</strong> Every transaction is
                permanently recorded on the blockchain, providing an immutable and
                fully auditable record of how funds are raised and spent.
              </li>
              <li>
                <strong>Ironclad Security:</strong> Smart contracts automate the entire
                fundraising process, ensuring that funds are released only when
                predefined milestones are verifiably met, which all but eliminates
                the risk of fraud.
              </li>
            </ul>

            <h2 className="text-3xl font-bold border-b-2 border-purple-500 pb-2 mt-8 mb-4">Our Roadmap to the Future</h2>
            <p className="text-lg leading-relaxed">
              Our roadmap is ambitious and divided into four key phases:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-lg">
              <li>
                <strong>Phase 1:</strong> Launch of the initial platform with
                core crowdfunding functionalities and a seamless user experience.
              </li>
              <li>
                <strong>Phase 2:</strong> Introduction of milestone-based fund
                releases and decentralized governance features for community-led
                decision-making.
              </li>
              <li>
                <strong>Phase 3:</strong> Expansion to support a wider range of
                cryptocurrencies and deep integration with other leading DeFi
                protocols.
              </li>
              <li>
                <strong>Phase 4:</strong> Development of a native mobile
                application for on-the-go access and a global marketing campaign to
                onboard the next wave of creators and backers.
              </li>
            </ol>
            <div className="text-center mt-12">
                <a href="/" className="inline-flex items-center justify-center h-12 px-8 font-bold tracking-wide text-white transition duration-200 rounded shadow-md bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:shadow-outline focus:outline-none">
                    Get Involved & Start a Campaign
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default WhitePaper; 