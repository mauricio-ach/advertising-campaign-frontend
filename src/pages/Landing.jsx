import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Campaign from "../components/Campaign";
import handleError from "../utils/handleError";
import axios from "axios";

const Landing = () => {

    const { campaign_id } = useParams();
    const [dashBoardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    const { data } = response.data;
                    setDashboardData(data);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                handleError(error);
            }
        }
        fetchDashboardData();
    }, []);

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

    const handleCampaignClick = (campaign_id) => {
        navigate(`/landing/${campaign_id}`);
    }

    return (
        loading ? (
            <p>Loading...</p>
        ) : (
            campaign_id ? (
                <Campaign
                    campaign_id={campaign_id}
                    fetchCampaignData={fetchCampaignData}
                />
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="fw-bold">Dashboard</h1>
                        </div>
                        <div className="col-12">
                            <div className="d-flex gap-2 justify-content-end">
                                <h4>Campañas totales:</h4>
                                <h4 className="fw-bold">{dashBoardData.totalCampaigns}</h4>
                            </div>
                            <div className="d-flex gap-2 justify-content-end">
                                <h4>Inversión total:</h4>
                                <h4 className="fw-bold">${dashBoardData.totalBudget}</h4>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            {Object.entries(dashBoardData.campaigns).map(([status, campaigns]) => (
                                <div key={status} className="mb-5">
                                    <h5 className="fw-bold">{status === "active" ? (
                                        "Activas"
                                    ) : (status === "paused") ? (
                                        "Pausadas"
                                    ) : (
                                        "Completadas"
                                    )}</h5>
                                    <table className="table table-bordered table-hover text-center align-middle table-responsive">
                                        <thead>
                                            <tr className="align-middle">
                                                <th>Título</th>
                                                <th>Descripción</th>
                                                <th>Presupuesto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {campaigns.map((campaign) => (
                                                <tr key={campaign.id} style={{ cursor: "pointer" }} onClick={() => handleCampaignClick(campaign.id)}>
                                                    <td>{campaign.title}</td>
                                                    <td>{campaign.description}</td>
                                                    <td>${campaign.budget}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        )
    );
}

export default Landing;