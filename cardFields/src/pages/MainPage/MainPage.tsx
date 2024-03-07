
import { Button, TextField, } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { CardItems } from '../../components/CardItems/CardItems';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useContext, useEffect } from 'react';
import { AppContext, AppDispatchContext } from '../../App';
import { firebaseApi } from '../../api/firebaseApi';
import { actions } from '../../actions/constatns';
import { DataCard } from '../../reducers/appReducer';
import { Loader } from '../../components/Loader/Loader';

export type OnLoadData = (payload: DataCard[]) => void;

const MainPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileMenu, setIsProfileMenu] = useState(false);
    const { user, cards } = useContext(AppContext);
    const dispatch = useContext(AppDispatchContext);

    const onChangeProfileMenu = () => {
        setIsProfileMenu((prev) => !prev);
    }

    useEffect(() => {
        if (user && user?.accessToken === '') {
            navigate('/auth');
        }

        const loadDataCards = async () => {
            if (user && user?.accessToken) {
                setIsLoading(true);
                await firebaseApi.getCards((cards: DataCard[]) => {
                    console.log({ firebaseApi: cards })
                    dispatch({
                        type: actions.SET_DATA_CARDS,
                        payload: {
                            cards,
                        }
                    })
                });
                setTimeout(() => setIsLoading(false), 3000);
            }

        }

        loadDataCards();
    }, [dispatch, navigate, user]);

    const signOut = async () => {
        await firebaseApi.loginOut();
        dispatch({
            type: actions.SIGN_OUT_USER,
            payload: {
                userAuth: {
                    id: '',
                    email: '',
                    accessToken: '',
                },
            }
        });
    }

    return (<div className='flex flex-col'>
        <div className='w-[95%] mx-auto'>
            <div className='grid grid-cols-[25%_1fr] gap-20 p-2 min-h-screen'>
                <div className="flex flex-col gap-5">
                    <div className='flex justify-between bg-[lightgrey] p-2 relative rounded-sm'>
                        <p className='truncate ...'>
                            <span>{user?.email}</span>
                        </p>
                        <button onClick={onChangeProfileMenu}>{isProfileMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</button>
                        {isProfileMenu &&
                            <ul className='bg-[lightgrey] p-2 absolute top-[101%] left-0 right-0 z-40 flex flex-col rounded-sm'>
                                <li ><Button onClick={signOut}>выйти</Button></li>
                            </ul>
                        }
                    </div>
                    <div className='flex flex-col gap-2 relative -z-0'>
                        <TextField label="Search" variant='outlined' size='small' className='w-full' />
                        <Link to={'/cards/create'} ><Button variant="contained" color="info" className='min-w-full' size='large'>ADD Card</Button></Link>
                    </div>
                    <div className="bg-[lightgrey] rounded-sm  relative  h-[80%] p-2">
                        {isLoading ? <Loader /> : !isLoading && cards.length > 0 ? <CardItems cards={cards} /> : "ytn"}
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    </div>)
}

export { MainPage };