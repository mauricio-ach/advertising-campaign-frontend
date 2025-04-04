import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, getRemainingDays, getTotalDays } from "../utils/dates";

const Campaign = ({
    campaign_id,
    fetchCampaignData,
}) => {
    const [campaign, setCampaign] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [totalDays, setTotalDays] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const campaign = await fetchCampaignData(campaign_id);
            if (campaign) {
                setCampaign(campaign);
                setStartDate(new Date(campaign.start));
                setEndDate(new Date(campaign.end));
                const totalDays = getTotalDays(new Date(campaign.start), new Date(campaign.end));
                setTotalDays(totalDays);
            }
            setLoading(false);
        }
        fetchData();
    }, [campaign_id]);

    const handleBackClick = () => {
        navigate("/landing");
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container mt-4">
                    {campaign ? (
                        <>
                            <div className="row">
                                <div className="col-6">
                                    <h1 className="fw-bold">{campaign.title}</h1>
                                    <p>{campaign.description}</p>
                                </div>
                                <div className="col-6 d-flex align-items-center justify-content-end">
                                    <button className="btn btn-sm btn-secondary" onClick={handleBackClick}>Regresar</button>
                                </div>
                            </div>
                            <div className="row" style={{ overflowX: "scroll" }}>
                                <div className="col-12">
                                    <table className="table table-bordered text-center align-middle table-responsive">
                                        <thead>
                                            <tr className="align-middle">
                                                <th>Inicio</th>
                                                <th>Fin</th>
                                                <th>Días totales</th>
                                                <th>Días restantes</th>
                                                <th>Estado</th>
                                                <th>Presupuesto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{formatDate(startDate)}</td>
                                                <td>{formatDate(endDate)}</td>
                                                <td>{totalDays}</td>
                                                <td>{getRemainingDays(endDate)}</td>
                                                <td>
                                                    {
                                                        campaign.status === "active" ? (
                                                            <>
                                                                <i className="fa-solid fa-play"></i>
                                                                <p>Activa</p>
                                                            </>
                                                        ) : (
                                                            campaign.status === "paused" ? (
                                                                <>
                                                                    <i className="fa-solid fa-pause"></i>
                                                                    <p>Pausada</p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <i className="fa-solid fa-check"></i>
                                                                    <p>Completada</p>
                                                                </>
                                                            )
                                                        )
                                                    }
                                                </td>
                                                <td>${campaign.budget}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="row">
                            <div className="col-12">
                                <p>No existe la campaña.</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Campaign;