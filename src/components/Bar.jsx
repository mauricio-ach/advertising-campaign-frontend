import useLogout from "../hooks/useLogout";
import "../styles/Bar.css";

const Bar = ({setIsAuthenticated}) => {

    const logout = useLogout(setIsAuthenticated);
    const handleLogout = () => {
        logout();
    }

    return (
        <div className="container bar-container">
            <div className="row p-3">
                <div className="col-6">
                    <h4>Bienvenido</h4>
                </div>
                <div className="col-6 text-end">
                    <button className="btn btn-danger" onClick={handleLogout}>Salir</button>
                </div>
            </div>
        </div>
    )
}

export default Bar;