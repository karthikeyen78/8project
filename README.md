# CrowdChain 🚀

CrowdChain is a decentralized crowdfunding application (DApp) built on Ethereum-compatible networks. It empowers creators to raise funds securely and transparently, utilizing a milestone-based fund release mechanism to protect backers and ensure accountability.

## 🌟 Features

*   **Milestone-Based Funding:** Funds are locked in a smart contract and released to creators only when predefined project milestones are met and approved by backers.
*   **Decentralized Storage:** Project details, images, and documentation are securely hosted on IPFS, ensuring data immutability.
*   **Transparent Analytics:** Seamlessly query blockchain data, campaign statistics, and transaction histories using The Graph.
*   **Web3 Integration:** Secure user authentication and transaction signing via MetaMask and Ethers.js.

## 🛠️ Tech Stack

*   **Frontend:** [Next.js](https://nextjs.org/) / React.js
*   **Web3 Interaction:** [Ethers.js](https://docs.ethers.org/)
*   **Decentralized Data:** [IPFS](https://ipfs.tech/)
*   **Data Indexing:** [The Graph](https://thegraph.com/)
*   **Network:** Ethereum-compatible networks (Base, Sepolia, etc.)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
*   [Node.js](https://nodejs.org/) (v16.x or higher)
*   [MetaMask](https://metamask.io/) browser extension

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/karthikeyen78/8project.git](https://github.com/karthikeyen78/8project.git)
    cd 8project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add your specific keys:
    ```env
    NEXT_PUBLIC_RPC_URL=your_rpc_endpoint_here
    NEXT_PUBLIC_IPFS_PROJECT_ID=your_ipfs_id
    NEXT_PUBLIC_IPFS_PROJECT_SECRET=your_ipfs_secret
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/karthikeyen78/8project/issues).
