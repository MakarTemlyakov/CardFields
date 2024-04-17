
import { Button, IconButton, Typography } from '@mui/material';
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

import * as XLSX from "xlsx";
import { Modal } from '../../components/Modal/Modal';

export type OnLoadData = (payload: DataCard[]) => void;

const MainPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileMenu, setIsProfileMenu] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const { state, dispatch } = useCustomContext(AppContext);
    const [searchValue, setSearchValue] = useState('');
    const filledCards = state.cards.filter((card) => card.name.includes(searchValue));

    const onSearch = (value: string) => {
        setSearchValue(value);
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
        const data = state.cards;
        let worksheet = {} as XLSX.WorkSheet;
        const workbook = XLSX.utils.book_new();
        data.map((card) => {
            const mappedFields = card.cardFields.map((field) => {
                return {
                    fieldName: field.name,
                    fieldValue: field.value,
                }
            });
            const mappedData = [{ name: card.name }, ...mappedFields];
            worksheet = XLSX.utils.json_to_sheet(mappedData);
            XLSX.utils.book_append_sheet(workbook, worksheet, `${card.name}`);
            XLSX.utils.sheet_add_aoa(worksheet, [["Имя компании", "Имя поля", "Значение поля"]], { origin: "A1" });
            worksheet["!cols"] = [...mappedData.map((data) => {
                return {
                    ...data,
                    wch: 20,
                }
            })].filter((c) => c.wch);
        });
        XLSX.writeFileXLSX(workbook, "Компании.xlsx");
    }
    const onChangeModalStatus = () => setIsModal(!isModal);
    return (<div className='flex flex-col dark:bg-slate-900 dark:text-white'>

        <div className='w-[95%] mx-auto '>
            {isModal && (<Modal onChangeModalStatus={onChangeModalStatus} title='Потверждение'>
                <Typography component='h2' variant='h5' textAlign='center'>Вы уверены?</Typography>
                <div className='flex justify-center gap-10 mt-5'>
                    <Button onClick={onDeleteAllCards} type="button" color="success" variant="contained">Да</Button>
                    <Button type="button" color="error" variant="contained" size='large' onClick={onChangeModalStatus}>Нет</Button>
                </div>
            </Modal>)}
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
                            <Button variant="contained" color="info" className='min-w-full' size='medium' onClick={onSaveToExcel}>Экспорт в Excel</Button>
                            <Button variant="contained" color="error" className='min-w-full' size='medium' onClick={() => setIsModal(!isModal)}>Удалить все</Button>
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