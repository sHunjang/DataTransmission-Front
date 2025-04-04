import axios from "axios";

export const sendFilesToServer = async (formData, threadCount = 1, serverUrl) => {
    return axios.post(`${serverUrl}/api/threads/send`, formData, {
        headers: {
            ...formData.getHeaders?.(),
            "Content-Type": "multipart/form-data",
        },
        params: { threadCount },
    });
};