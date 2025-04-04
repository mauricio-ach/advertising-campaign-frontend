import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notfications = () => {
    return (
        <ToastContainer 
            position="bottom-right"
            autoClose={3000}
            theme="dark"
            hideProgressBar={false}
            transition={Slide}
            limit={3}
            stacked
        />
    )
}

const notify = (msg, type = 'default') => {
    switch (type) {
        case "success":
            toast.success(msg);
            break;
        case "error":
            toast.error(msg);
            break;
        case "info":
            toast.info(msg);
            break;
        case "warning":
            toast.warn(msg);
            break;
        default:
            break;
    }
}

export {
    Notfications,
    notify
}