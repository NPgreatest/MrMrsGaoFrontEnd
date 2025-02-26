import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Post a new chat message
export const postChatMessage = async (messageData) => {
    const response = await axios.post(`${API_BASE_URL}/api/search`, messageData, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
    });
    console.log(response.data);
    return response.data;
};