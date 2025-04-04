import { notify } from "../components/Notifications"

const handleError = (error) => {
    if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
            notify(error.response.data.message, 'warning');
        } else if (error.response.status >= 500) {
            notify(error.response.data.message, 'error');
        }
    } else {
        notify('Error de conexión o servidor', 'error');
    }
}

export default handleError;