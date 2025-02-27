import axios from "axios";
import https from "https";
import fs from "fs";

// Path to the self-signed certificate (make sure it exists on Heroku)
const CERT_PATH = "/app/certs/my_cert.pem";

// Create an HTTPS agent that uses the self-signed certificate
const httpsAgent = new https.Agent({
    ca: fs.readFileSync(CERT_PATH), // Read the self-signed certificate
    rejectUnauthorized: false, // (Optional) If the cert is still untrusted, this will ignore errors (not recommended for production)
});

const API_BASE_URL = "https://168.4.124.31";

// Post a new chat message
export const postChatMessage = async (messageData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/search`, messageData, {
            headers: {
                "Content-Type": "application/json",
            },
            httpsAgent: httpsAgent, // Use the custom HTTPS agent
        });
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
};
