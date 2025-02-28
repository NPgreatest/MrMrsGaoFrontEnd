import axios from "axios";

const API_BASE_URL = "http://168.4.124.31:8000";

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

