import { useEffect, useState } from "react"
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import { Notfications } from "./components/Notifications";
import checkAuth from "./utils/checkAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";
import './styles/App.css'

import Login from "./pages/Login";
import Bar from "./components/Bar";
import Landing from "./pages/Landing";

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
                    navigate("/landing");
                }
                return Promise.reject(error);
            }
        )

        authCheck();
        return () => axios.interceptors.response.eject(interceptor);
    }, [navigate]);

    return (
        <div className="container mb-5">
            <div><Notfications /></div>
            {isAuthenticated ? (
                <div className="row">
                    <div className="col-12">
                        <Bar
                            setIsAuthenticated={setIsAuthenticated}
                        />
                    </div>
                    <div className="col-12">
                        <UserRoutes
                            isAuthenticated={isAuthenticated}
                        />
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

const UserRoutes = ({ isAuthenticated }) => {
    return (
        <div className="container">
            <Routes>
                <Route
                    path="/landing/:campaign_id"
                    element={
                        <ProtectedRoute
                            element={<Landing />}
                            isAuthenticated={isAuthenticated}
                        />
                    }
                />
                <Route 
                    path="/landing"
                    element={
                        <ProtectedRoute
                            element={<Landing />}
                            isAuthenticated={isAuthenticated}
                        />
                    }
                />
                <Route
                    path="*"
                    element={
                        <ProtectedRoute
                            element={<Landing />}
                            isAuthenticated={isAuthenticated}
                        />
                    }
                />
            </Routes>
        </div>
    )
}

export default App
