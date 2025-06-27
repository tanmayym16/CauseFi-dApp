# Decentralized Crowdfunding DApp

A modern, full-stack decentralized crowdfunding platform built with **Next.js**, **React**, **Tailwind CSS**, **Solidity**, **Hardhat**, and **Ethers.js**. This DApp enables users to create, fund, and manage campaigns transparently on the Ethereum blockchain.

---

## 🚀 Project Overview

This platform empowers project creators to raise capital directly from a global pool of supporters, leveraging blockchain for transparency, security, and automation. Smart contracts ensure funds are only released when conditions are met, reducing fraud and increasing trust.

---

## ✨ Features
- Create and manage crowdfunding campaigns
- Donate to campaigns using MetaMask or any Ethereum wallet
- View campaign details, stories, and donation history
- Responsive, modern UI with real-time blockchain data
- Demo campaigns for exploration
- User authentication via wallet connect/disconnect
- Impact metrics and campaign statistics

---

## 🛠️ Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) (React framework)
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [web3modal](https://github.com/Web3Modal/web3modal) (wallet connection)

**Blockchain / Backend:**
- [Solidity](https://soliditylang.org/) (smart contracts)
- [Hardhat](https://hardhat.org/) (development, deployment, testing)
- [Ethers.js](https://docs.ethers.io/)
- [Node.js](https://nodejs.org/)

**Other:**
- React Context API (state management)
- Custom SVG icons
- PostCSS, Autoprefixer

---

## 📄 Smart Contract Overview

**File:** `contracts/CrowdFunding.sol`
- Users can create campaigns with a title, description, target amount, deadline, and image.
- Anyone can donate ETH to campaigns; donations are tracked per user and campaign.
- Campaign creators can view their campaigns; donors can view campaigns they've supported.
- All campaign and donation data is stored on-chain for transparency.

---

## 🗂️ Project Structure

```
├── contracts/           # Solidity smart contracts
│   └── CrowdFunding.sol
├── Context/             # React context for blockchain logic
├── Components/          # Reusable React components (NavBar, Card, Footer, etc.)
├── pages/               # Next.js pages (index, campaign/[id], donation, members, white-paper)
├── public/              # Static assets
├── scripts/             # Deployment scripts
├── styles/              # Tailwind/global CSS
├── test/                # Smart contract tests
├── hardhat.config.js    # Hardhat configuration
└── package.json         # Project dependencies
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MetaMask](https://metamask.io/) or another Ethereum wallet

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Croud-funding-starter-file-main
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the local blockchain (Hardhat):**
   ```bash
   npx hardhat node
   ```
4. **Deploy the smart contract:**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```
5. **Update the contract address:**
   - Copy the deployed contract address from the Hardhat output.
   - Update `Context/contants.js` with the new address.

6. **Run the Next.js app:**
   ```bash
   npm run dev
   ```
7. **Open in your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Usage
- Connect your wallet using the NavBar.
- Create a new campaign or browse existing ones.
- Donate ETH to campaigns and view your donation history.
- Explore demo campaigns and campaign stories.

---

## 🧪 Testing
- Smart contract tests can be found in the `test/` directory.
- Run tests with:
  ```bash
  npx hardhat test
  ```

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License
This project is licensed under the MIT License.

---

## 🙏 Credits
- Inspired by the [blockchaincoders.com](https://www.theblockchaincoders.com/) community.
- UI/UX and smart contract logic by project contributors.

---

**Showcase your skills!**
- Add this project to your portfolio or CV to demonstrate full-stack web3 development, smart contract integration, and modern frontend engineering.
