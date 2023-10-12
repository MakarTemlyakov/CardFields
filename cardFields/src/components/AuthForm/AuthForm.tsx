import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEvent, useState, useContext } from 'react';
import { CardsDispatchContex } from '../../App';
import { actions } from '../../actions/constatns';

export const AuthForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatchCard = useContext(CardsDispatchContex);

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
        const user = {
            email,
            password,
        }

        dispatchCard({
            type: actions.SET_AUTH_USER_DATA,
            payload: {
                user
            }
        })
    }

    return (
        <form className='flex flex-col w-1/6 bg-[#ebeaea] p-5 gap-5 m-auto relative top-1/2 -translate-y-1/2 rounded-sm'>
            <TextField type='text' size='small' label='Логин' onChange={onChangeEmail} />
            <TextField type='password' size='small' label='Пароль' onChange={onChangePassword} />


            <LoadingButton
                loading={true}
                loadingPosition="start"
                variant="contained"
                onClick={onSubmit}
            >
                Вход
            </LoadingButton>
        </form>
    )
}