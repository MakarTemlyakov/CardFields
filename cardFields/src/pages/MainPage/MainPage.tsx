
import { Button, TextField, } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { CardItems } from '../../components/CardItems/CardItems';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useContext, useEffect } from 'react';
import { AppContext, AppDispatchContext } from '../../App';
import { useIsAuth } from '../../utils/useIsAuth';
import { firebaseApi } from '../../api/firebaseApi';
import { actions } from '../../actions/constatns';

import { DataCard } from '../../reducers/appReducer';



export type OnLoadData = (payload: DataCard[]) => void;

const MainPage = () => {
    // const isAuth = useIsAuth();
    const navigate = useNavigate();
    const [isProfileMenu, setIsProfileMenu] = useState(false);
    const { user, cards } = useContext(AppContext);
    const dispatch = useContext(AppDispatchContext);

    const onChangeProfileMenu = () => {
        setIsProfileMenu((prev) => !prev);
    }

    useEffect(() => {
        // if (!isAuth) {
        //     navigate('/auth');
        // }

        const loadDataCards = async () => {
            return await firebaseApi.getCards((cards: DataCard[]) => {
                console.log({ load: cards })
                dispatch({
                    type: actions.SET_DATA_CARDS,
                    payload: {
                        cards,
                    }
                })
            });
        }

        loadDataCards();
    }, [dispatch]);


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
                                <li>Выйти</li>
                            </ul>
                        }
                    </div>
                    <div className='flex relative -z-0 items-center'>
                        <TextField label="Search" variant='outlined' size='small' className='w-[70%]' />
                        <Link to={'/cards/create'} className="ml-auto"><Button variant="contained" color="info">ADD Card</Button></Link>
                    </div>
                    <div className="bg-[lightgrey] rounded-sm  relative  h-[80%] p-2">
                        {cards.length > 0 ? <CardItems cards={cards} /> : <>Соси</>}
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    </div>)
}

export { MainPage };