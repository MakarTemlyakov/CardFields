

import { AuthForm } from "../../components/AuthForm/AuthForm"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

const AuthPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/cards')
        }
    }, [navigate, user])


    return (
        <div className="h-full">
            <AuthForm />
        </div>
    )
}

export { AuthPage };