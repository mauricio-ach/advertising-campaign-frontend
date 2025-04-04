import { useCallback } from "react";
import { useParams } from "react-router-dom";
import Campaign from "../components/Campaign";
import handleError from "../utils/handleError";
import axios from "axios";

const Landing = () => {

    const { campaign_id } = useParams();

    const fetchCampaignData = useCallback(async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/campaigns/${campaign_id}`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                const { campaign } = response.data;
                return campaign;
            }
        } catch (error) {
            return null;
        }
    });

    return (
        <Campaign 
            campaign_id={campaign_id}
            fetchCampaignData={fetchCampaignData}
        />  
    );
}

export default Landing;