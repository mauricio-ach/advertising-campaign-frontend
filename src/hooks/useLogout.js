import { useNavigate } from "react-router-dom"
import { notify } from "../components/Notifications";
import handleError from "../utils/handleError";
import axios from "axios";

const useLogout = (setIsAuthenticated) => {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, {}, {
                withCredentials: true,
            });
    
            if (response.status === 200) {
                setIsAuthenticated(false);
                notify("Logout exitoso", "success");
                navigate("/", { replace: true });
            }
        } catch (error) {
            handleError(error);
            console.log(error);
        }
    }
    return logout;
}

export default useLogout;