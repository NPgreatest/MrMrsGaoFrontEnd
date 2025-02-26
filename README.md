# Chatbot Project

## Overview
This project is a chatbot front-end and back-end implementation that allows users to interact with a memory module. The application supports:
- Displaying all messages in a specific chat.
- Handling memory creation, retrieval, and access requests.
- Approving or rejecting memory access requests.
- (Optional) Integrating a cryptocurrency wallet using EIP712 for approval signature.

<img src="pic/WechatIMG51.jpg" alt="WechatIMG51" style="zoom:33%;" />



## Folder Structure

```
├── chatbot
│   ├── README.md
│   ├── back-end
│   │   ├── db.js
│   │   ├── package.json
│   │   └── server.js
│   ├── contract
│   │   └── my-dapp
│   │       ├── artifacts
│   │       ├── cache
│   │       ├── contracts
│   │       ├── hardhat.config.js
│   │       ├── ignition
│   │       ├── package-lock.json
│   │       ├── package.json
│   │       └── scripts
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── pages
│   └── vite.config.js
└── inp.txt
```

## Installation
### Prerequisites
Ensure you have the following installed on your system:
- Node.js (>=14)
- npm or yarn
- Hardhat (for blockchain contract deployment, if implementing Scenario 2)

### Steps
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd chatbot
   ```
2. Install dependencies for both front-end and back-end:
   ```sh
   cd back-end
   npm install
   cd ../
   npm install
   ```
3. Start the back-end service:
   ```sh
   cd back-end
   node server.js
   ```
4. Start the front-end application:
   ```sh
   npm run dev
   ```

## API Endpoints
### Chat Messages
- **GET** `/chat/0` - Retrieves all messages in chat ID 0.

### Memory Access
- **POST** `/memory/approve-access` - Approves memory access.
- **POST** `/memory/reject-access` - Rejects memory access.

## Interaction Workflow
1. Start the back-end service.
2. Open the front-end page and view chat messages.
3. Click "Approve" or "Reject" to update memory access.
4. Restart the back-end service and recheck chat content.

## Scenario 2 (Optional)
To integrate the cryptocurrency wallet and EIP712 signature approval:
1. Deploy the smart contract using Hardhat:
   ```sh
   cd contract/my-dapp
   npx hardhat run scripts/deploy.js
   ```
2. Update the front-end to use the deployed contract address.
3. Implement wallet connection and signing in `MemoryApproval.jsx`.

## License
MIT License

