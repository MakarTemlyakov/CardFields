import { Button, Typography } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormField } from '../FormField/FormFiled';
import { firebaseApi } from '../../api/firebaseApi';
import { AppContext, DataField } from '../../providers/AppProvider';
import useCustomContext from '../../hooks/useContext';


export const Card = () => {
    const { cardId } = useParams();
    const [isShowForm, setToggleAddForm] = useState(false);
    const { state } = useCustomContext(AppContext);
    const card = state.cards.find((card) => card.id === cardId!);
    const [name, setName] = useState('');
    const [fields, setFields] = useState<DataField[]>([]);
    const [isEditMode, setEditMode] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (card) {
            setName(card.name);
            setFields(card.cardFields);
        }
    }, [card]);

    const onSaveCard = async () => {
        const updatedCard = {
            id: card!.id,
            name: name!,
            cardFields: fields,
        }
        await firebaseApi.updateCardById(updatedCard);
        setEditMode(false);
    }

    const onDeleteField = (field: DataField) => {
        setFields(fields?.filter((f) => f.id !== field.id));
    }

    const onToggleAddForm = () => {
        setToggleAddForm((prev) => !prev);
    }

    const onAddDataField = (field: DataField) => {
        setFields([...fields!, field]);
        onToggleAddForm();
    }

    const onDeleteCard = async (cardId: string) => {
        await firebaseApi.deleteCardById(cardId);
        const deletedCard = state.cards.find((card) => card.id === cardId);

        if (deletedCard && state.cards.length === 1) {
            navigate(`/cards`, { replace: true });
        }
        if (deletedCard && state.cards.length > 1) {
            const currentCardId = state.cards[state.cards.indexOf(deletedCard) - 1].id;
            navigate(`../${currentCardId}`, { replace: true });
        }
    }

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setName(name);
    }

    const onChangeValueField = (event: React.ChangeEvent<HTMLInputElement>, field: DataField) => {
        const value = event.target.value;
        const updatedFields = fields.map((f) => f.id === field.id ? { ...f, value: value } : f);
        setFields(updatedFields);
    }
    return card ? (
        <main className='rounded-[4px] bg-lightgray w-full  flex flex-col min-h-screen '>
            {isShowForm && <FormField onToggleAddForm={onToggleAddForm} onAddDataField={onAddDataField} countFields={fields.length} />}
            <Typography variant="h5" mb='5px' component="h1" className='dark:text-slate-400'>Карточка</Typography>
            <div className='w-full h-0.5 bg-slate-200 dark:bg-slate-800 rounded-[2px] mb-10' />
            <div className='flex flex-col gap-10 w-1/2 dark:text-slate-300' >
                <div className='grid grid-cols-2'>
                    <Typography mb='5px' component='p'><span className='truncate'>Название:</span></Typography>
                    <div className='flex gap-2 items-center'>
                        {isEditMode ?
                            <>
                                <OutlinedInput size='small' value={name} onChange={onChangeName} classes={{ input: 'dark:bg-slate-800 dark:text-slate-300' }} />
                                <Button children={<Add />} variant="contained" size="small" color='success' onClick={onToggleAddForm} />
                            </> :
                            <Typography mb='5px' component="p" ><span className='truncate'>{card.name}</span></Typography>
                        }
                    </div>
                </div>
                {fields && fields.length > 0 && fields.map((field: DataField) => (
                    <div className='grid grid-cols-2' key={field.id}>
                        <Typography mb='5px' className='flex flex-1'>{field.name}:</Typography>
                        <div className='flex gap-2 items-center'>
                            {isEditMode ?
                                <>
                                    <OutlinedInput size='small' value={field.value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeValueField(event, field)} classes={{ input: 'dark:bg-slate-800 dark:text-slate-300' }} />
                                    <Button children={<RemoveIcon />} variant="contained" size="small" color='error' onClick={() => onDeleteField(field)} />
                                    <Button children={<Add />} variant="contained" size="small" color='success' onClick={onToggleAddForm} />
                                </>
                                :
                                <Typography mb='5px' component='p'><span className='truncate'>{field.value}</span></Typography>
                            }
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex gap-10 justify-center mt-auto'>
                {isEditMode ?
                    <>
                        <Button variant="contained" size="large" color='success' className='p-30' onClick={onSaveCard}>Сохранить</Button>
                        <Button variant="contained" size="large" color='error' className='p-30' onClick={() => setEditMode(false)}>Отменить</Button>
                    </>
                    :
                    <>
                        <Button variant="contained" size="large" color='success' className='p-30' onClick={() => setEditMode(true)}>Редактировать</Button>
                        <Button variant="contained" size="large" color='error' className='p-30' onClick={() => onDeleteCard(card?.id)}>Удалить</Button>
                    </>
                }
            </div>
        </main >
    ) : <>Такой карточки нет</>
}