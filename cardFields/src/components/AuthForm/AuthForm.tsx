import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEvent, useState } from 'react';
import { authApi } from '../../api/authApi';

export const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


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
        authApi.signIn(user);

    }
    return (
        <form className='flex flex-col w-1/6 bg-[#ebeaea] p-5 gap-5 m-auto relative top-1/2 -translate-y-1/2 rounded-sm'>
            <TextField type='text' size='small' label='Логин' onChange={onChangeEmail} />
            <TextField type='password' size='small' label='Пароль' onChange={onChangePassword} />
            <Button type='submit' variant='contained' color='primary' onClick={onSubmit}>Вход</Button>
        </form>
    )
}