import { AppContext } from "../../App";
import { AuthForm } from "../../components/AuthForm/AuthForm"
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);

    useEffect(() => {
        if (user && user?.accessToken) {
            navigate('/cards');
        }
    }, [user, navigate])

    return (
        <div className="h-full">
            <AuthForm />
        </div>
    )
}

export { AuthPage };