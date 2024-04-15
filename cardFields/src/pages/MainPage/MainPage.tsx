
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { CardItems } from '../../components/CardItems/CardItems';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useEffect } from 'react';
import { firebaseApi } from '../../api/firebaseApi';
import { actions } from '../../actions/constatns';
import { Loader } from '../../components/Loader/Loader';
import { SearchBox } from '../../components/SearchBox';
import useCustomContext from '../../hooks/useContext';
import { AppContext, DataCard } from '../../providers/AppProvider';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Modal } from '../../components/Modal/Modal';
import * as XLSX from "xlsx";

export type OnLoadData = (payload: DataCard[]) => void;

const MainPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileMenu, setIsProfileMenu] = useState(false);
    const { state, dispatch } = useCustomContext(AppContext);
    const [searchValue, setSearchValue] = useState('');
    const [isModal, setIsModal] = useState(false);
    const filledCards = state.cards.filter((card) => card.name.includes(searchValue));
    const onSearch = (value: string) => {
        setSearchValue(value);
    }

    const onToggleAddForm = () => {
        setIsModal((prev) => !prev);
    }
    const onChangeProfileMenu = () => {
        setIsProfileMenu((prev) => !prev);
    }

    useEffect(() => {
        if (!state.user) {
            navigate('/auth');
        }

        const loadDataCards = async () => {
            setIsLoading(true);
            await firebaseApi.getCards((cards: DataCard[]) => {
                dispatch({
                    type: actions.SET_DATA_CARDS,
                    payload: {
                        cards: cards,
                    }
                })
            });
            setIsLoading(false);
        }

        loadDataCards();
    }, [dispatch, navigate, state.user]);

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

    const onDeleteAllCards = async () => {
        await firebaseApi.deleteAllCards();
    }

    const onSaveToExcel = () => {
        const workbook = XLSX.utils.book_new();
        state.cards.map((card) => {
            const worksheet = XLSX.utils.json_to_sheet([{ id: card.id }, { name: card.name }, ...card.cardFields]);
            const max_width = state.cards.reduce((w, r) => Math.max(w, r.id.length), 10);
            worksheet["!cols"] = [{ wch: max_width }];
            XLSX.utils.book_append_sheet(workbook, worksheet, `${card.name}`);
            XLSX.utils.sheet_add_aoa(worksheet, [["Id карточки", "Имя карточки"]], { origin: "A1" });
        });

        XLSX.writeFileXLSX(workbook, "Report.xlsx");

    }

    return (<div className='flex flex-col dark:bg-slate-900 dark:text-white'>
        {isModal && <Modal onToggleAddForm={onToggleAddForm} title={'Экспорт данных'}>
            <div className='flex justify-start items-center gap-5'>
                <Button type="button" variant="contained" color='success' onClick={onSaveToExcel}>Сохранить</Button>
            </div>
        </Modal>}
        <div className='w-[95%] mx-auto '>
            <div className='grid grid-cols-[25%_1fr] gap-20 p-2 min-h-screen '>
                <div className="flex flex-col gap-5 ">
                    <div className='flex justify-between gap-1 '>
                        <div className='flex justify-between relative flex-grow bg-[lightgrey] p-2 rounded-sm dark:bg-slate-800 dark:text-slate-300'>
                            <p className='truncate ...'>
                                <span>{state.user?.email}</span>
                            </p>
                            <button onClick={onChangeProfileMenu}>{isProfileMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</button>
                            {isProfileMenu &&
                                <ul className='bg-[lightgrey] p-2 absolute top-[105%] left-0 right-0 z-40 flex flex-col rounded-sm dark:bg-slate-800 '>
                                    <li ><Button onClick={signOut}>выйти</Button></li>
                                </ul>
                            }
                        </div>
                        <IconButton color="primary" onClick={() => dispatch({ type: actions.TOGGLE_THEME })}>{state.theme === 'dark' ? <WbSunnyIcon /> : <NightlightIcon />}</IconButton>
                    </div>
                    <div className='flex flex-col gap-2 relative -z-0'>
                        <SearchBox onSearch={onSearch} searchValue={searchValue} />
                        <div className='flex justify-between'>
                            <Link to={'/cards/create'} ><Button variant="contained" color="success" className='min-w-full' size='medium'>Добавить</Button></Link>
                            <Button variant="contained" color="info" className='min-w-full' size='medium' onClick={() => setIsModal(!isModal)}>Экспорт в Excel</Button>
                            <Button variant="contained" color="error" className='min-w-full' size='medium' onClick={onDeleteAllCards}>Удалить все</Button>
                        </div>
                    </div>

                    <div className="bg-[lightgrey] rounded-sm  relative  h-[80%] p-2 flex flex-col dark:bg-slate-800">
                        {isLoading ? <Loader /> : !isLoading && filledCards.length > 0 ? <CardItems cards={filledCards} /> : <span className='m-auto'>Нет карточек</span>}
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    </div>)
}

export { MainPage };