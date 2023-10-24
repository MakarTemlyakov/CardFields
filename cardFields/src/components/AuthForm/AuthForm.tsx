import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEvent, useState, useContext, useEffect } from 'react';
import { AppDispatchContext } from '../../App';
import { actions } from '../../actions/constatns';
import { User } from '../../reducers/appReducer';
import { firebaseApi } from '../../api/firebaseApi';
import { useIsAuth } from '../../utils/useIsAuth';
import { useNavigate } from 'react-router-dom';

export const AuthForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useContext(AppDispatchContext);
    const isAuth = useIsAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/cards');
        }
    }, [isAuth, navigate])

    const signIn = async (user: User) => {
        setIsLoading(true);
        const data = await firebaseApi.signIn(user);
        dispatch({
            type: actions.SET_AUTH_USER_DATA,
            payload: {
                userAuth: data.user,
            }
        });
        setIsLoading(false);
    };

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(password);
    }

    const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const user: User = {
            email,
            password,
        }
        signIn(user);
    }



    return (
        <form className='flex flex-col w-1/6 bg-[#ebeaea] p-5 gap-5 m-auto relative top-1/2 -translate-y-1/2 rounded-sm'>
            <TextField type='text' size='small' label='Логин' onChange={onChangeEmail} />
            <TextField type='password' size='small' label='Пароль' onChange={onChangePassword} />
            <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={onSubmit}
            >
                Вход
            </LoadingButton>
        </form>
    )
}