import { useState } from 'react';
import { notify } from '../components/Notifications';
import handleError from '../utils/handleError';
import '../styles/Login.css';
import axios from 'axios';

const Login = ({
    setIsAuthenticated
}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
                email,
                password
            }, {
                withCredentials: true,
            });

            if (response.status === 200) {
                setIsAuthenticated(true);
                notify('Inicio de sesión exitoso', 'success');
                setEmail('');
                setPassword('');
            }

        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <div className='mb-3 text-center'>
                    <h3>Iniciar sesión</h3>
                </div>
                <div className='mb-3'>
                    <label htmlFor="inputEmail1" className="form-label">Email</label>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        required
                        placeholder='Ingrese su email'
                        type="email" 
                        className="form-control" 
                        id="inputEmail1"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Ingrese su contraseña'
                        type="password" 
                        className="form-control" 
                        id="inputPassword" 
                    />
                </div>
                <div className='text-end'>
                    <button type='submit' className='btn btn-primary'>Entrar</button>
                </div>
            </form>
        </div>
    )
}

export default Login;