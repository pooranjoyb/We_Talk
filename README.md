## We-Talk 🌐

WeTalk is a web-based video conferencing application that facilitates seamless real-time communication and collaboration across geographical barriers. It integrates WebRTC and Agora SDK for peer-to-peer (P2P) video communication. With Socket.IO, WeTalk enhances interaction through real-time chat functions, enabling participants to exchange text messages alongside video sessions.

### Features:

- **_Real-time Video Conferencing_**: Conduct high-quality video conferences with minimal latency.
- **_Peer-to-Peer Communication_**: Utilize WebRTC for direct P2P connections, ensuring efficient and secure transmission of video and audio streams.
- **_Interactive Chat_**: Exchange text messages in real-time during video sessions.
- **_Scalable and Secure Architecture_**: Designed to handle scalability needs while prioritizing security and privacy concerns.

### Tech Stack:

- **_Frontend_**: React
- **_Backend_**: Node.js
- **_Video Communication_**: WebRTC, Agora SDK
- **_Real-time Interaction_**: Socket.IO

### Getting Started:

- Clone the repository
```bash
  git clone https://github.com/pooranjoyb/We_Talk.git
```

- Install the dependencies
```bash
  npm install
  cd client && npm install
```
- Setup MongoDB collection in your local machine
  - Enter MongoDB shell
    ```bash
      mongosh 
    ```
  - Create a database called `wetalk`
    
    ```bash
      use wetalk
    ```
  - Create the following collections
    
    ```bash
    db.createCollection("users")
    db.createCollection("rooms")
    db.createCollection("chats")
    ```
- Create an Agora Account and add the Agora SDK `AppId` & `TOKEN`.  Remmeber to keep the `channel name` as `wetalk` while creating the project.
   
  ```bash
  cd client
  nano .env

  # Add these in the .env file
  
  REACT_APP_API_URL=http://localhost:5000
  REACT_APP_AGORA_APP_ID=your_agora_app_id
  REACT_APP_AGORA_TOKEN=your_agora_sdk_temp_webrtc_token
  ```
- Start the server and client from the root directory (both in seperate terminals).
```bash
  npm run server
  npm run dev
```

` All Set! You can checkout the project live in your local machine :)

(In case your database doesn't get connected update the following)

```bash
  cd utils && nano db.js
  const MONGODB_URI = 'mongodb://127.0.0.1:27017/wetalk'
```

## License

This project is licensed under the **[MIT License](LICENSE)**
