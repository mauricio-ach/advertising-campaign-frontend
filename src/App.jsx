import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import { Notfications } from "./components/Notifications";
import checkAuth from "./utils/checkAuth";
import axios from "axios";
import './styles/App.css'

import Login from "./pages/Login";
import Bar from "./components/Bar";

function App() {

    return (
        <Router>
            <MainApp />
        </Router>
    )
}

function MainApp() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            const auth = await checkAuth();
            setIsAuthenticated(auth);
        }

        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401) {
                    setIsAuthenticated(false);
                    navigate("/");
                }
                return Promise.reject(error);
            }
        )

        authCheck();
        return () => axios.interceptors.response.eject(interceptor);
    }, [navigate]);

    return (
        <div className="container">
            <div><Notfications /></div>
            {isAuthenticated ? (
                <div className="content-container">
                    <div className="row">
                        <div className="col-12">
                            <Bar 
                                setIsAuthenticated={setIsAuthenticated}
                            />
                        </div>
                        <div className="col-12">
                            l
                        </div>
                    </div>
                </div>
            ) : (
                <Login
                    setIsAuthenticated={setIsAuthenticated}
                />
            )}
        </div>
    )
}

const routes = ({ isAuthenticated }) => {
    return (
        <div>
            <Routes>

            </Routes>
        </div>
    )
}

export default App
