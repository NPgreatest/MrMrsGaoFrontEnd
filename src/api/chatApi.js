import axios from "axios";

const API_BASE_URL = "http://168.4.124.31:8000";


// Post a new chat message
export const postChatMessage = async (messageData) => {

    const response = await axios.post(`${API_BASE_URL}/api/search`,messageData, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
    });
    console.log(response.data);
    return response.data;
};
