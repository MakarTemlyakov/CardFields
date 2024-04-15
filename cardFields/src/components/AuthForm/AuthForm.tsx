import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEvent, useState } from 'react';
import { actions } from '../../actions/constatns';
import { firebaseApi } from '../../api/firebaseApi';
import { AppContext, User } from '../../providers/AppProvider';
import useCustomContext from '../../hooks/useContext';

export const AuthForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useCustomContext(AppContext);

    const signIn = async (user: User) => {
        setIsLoading(true);
        const data = await firebaseApi.signIn(user);
        dispatch({
            type: actions.AUTH_USER,
            payload: {
                userAuth: data?.user,
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
        <form className='dark:bg-slate-800 bg-[#ffffff] rounded-sm  p-5 gap-2  flex flex-col relative top-1/2 -translate-y-1/2 m-auto w-[90%] md:w-[60%]'>
            <TextField
                type='text'
                label='Логин'
                onChange={onChangeEmail}
                InputProps={{
                    classes: {
                        root: 'dark:bg-slate-700 dark:text-slate-300',
                    }
                }}
                InputLabelProps={{
                    classes: {
                        root: 'dark:text-slate-400',
                    }
                }} />
            <TextField
                type='password'
                label='Пароль'
                onChange={onChangePassword}
                InputProps={{
                    classes: {
                        root: 'dark:bg-slate-700 dark:text-slate-300',

                    },
                }} InputLabelProps={{
                    classes: {
                        root: 'dark:text-slate-400'
                    }
                }} />
            <LoadingButton
                size='large'
                loading={isLoading}
                loadingPosition="start"
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={onSubmit}
                className='dark:bg-slate-700 dark:text-slate-300 hover:bg-black '
            >
                Вход
            </LoadingButton>
        </form>
    )
}