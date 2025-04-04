import axios from "axios";

const checkAuth = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/check/auth`, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        return false;   
    }
}

export default checkAuth;