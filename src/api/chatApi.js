import axios from "axios";

// const API_BASE_URL = "http://168.4.124.31:8000";
// const TTS_API_URL = "http://168.4.124.31:9880/tts"; 

const API_BASE_URL = "https://api.laogao.us";
const TTS_API_URL = "https://tts.laogao.us/tts"; 


// Post a new chat message
export const postChatMessage = async (messageData) => {
    const response = await axios.post(`${API_BASE_URL}/api/search`, messageData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    // console.log(response.data);
    return response.data;
};



// curl --location 'http://127.0.0.1:9880/tts?text=哈喽大家好我是NP123的克隆人老高text_lang=zh&ref_audio_path=output%2Freference.wav&prompt_lang=zh&prompt_text=就是跟他这个成长的外部环境有关系，和本身的素质也有关系，他是一个&text_split_method=cut5&batch_size=1&media_type=wav&streaming_mode=true'

// Post a text message to the TTS API
export const postTTSMessage = async (text) => {
    const params = new URLSearchParams({
        text,
        text_lang: "zh",
        ref_audio_path: "output/reference.wav",
        prompt_lang: "zh",
        prompt_text: "就是跟他这个成长的外部环境有关系，和本身的素质也有关系，他是一个",
        text_split_method: "cut5",
        batch_size: "1",
        media_type: "wav",
        streaming_mode: "true",
    });

    const response = await axios.get(`${TTS_API_URL}?${params.toString()}`, {
        responseType: "arraybuffer",  // ✅ Ensures binary data is received
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log("TTS Response Data Type:", typeof response.data);  // Should be 'object' (ArrayBuffer)
    console.log("TTS Response Data Length:", response.data.byteLength);  // Ensure it has data
    return response.data;  // Return binary arraybuffer
};
