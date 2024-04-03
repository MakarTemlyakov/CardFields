import { AuthForm } from "../../components/AuthForm/AuthForm"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomContext from "../../hooks/useContext";
import { AppContext } from "../../providers/AppProvider";


const AuthPage = () => {
    const navigate = useNavigate();
    const { state } = useCustomContext(AppContext);

    useEffect(() => {
        if (state.user) {
            navigate('/cards')
        }
    }, [navigate, state.user])


    return (
        <div className="h-full">
            <AuthForm />
        </div>
    )
}

export { AuthPage };