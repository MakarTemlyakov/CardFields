import { Button, Typography } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CardsContext, CardsDispatchContex, DataField, FieldsContext, FieldsDispatchContext } from '../../App';
import { useContext, useState, useEffect } from 'react';
import { actions } from '../../actions/constatns';
import { DataCard } from '../../reducers/cardsReducer';
import { useParams } from 'react-router-dom';
import { FormField } from '../FormField/FormFiled';

type CardProps = {

    card: DataCard;
}



export const Card = () => {
    const fields = useContext(FieldsContext);

    const [isDirty, setDirty] = useState(false);
    const [isShowForm, setToggleAddForm] = useState(false);
    const { cardId } = useParams();
    const dispatchField = useContext(FieldsDispatchContext);
    const dispatchCard = useContext(CardsDispatchContex);
    const cards = useContext(CardsContext);
    const [currentCardId, setCurrentCardId] = useState(cardId);
    const card = cards.cards.find((card) => card.id === +cardId!);
    const cardFields = isDirty ? fields : card!.cardFields;
    console.log({ card })
    console.log({ isDirty })


    useEffect(() => {
        if (currentCardId !== cardId) {
            setCurrentCardId(cardId);
        }
    }, [cardId, currentCardId]);

    const onDeleteField = (field: DataField) => {
        dispatchField({
            type: actions.DELETE,
            payload: {
                id: field.id,
                name: field.name,
                value: field.value,
            }
        });
    }

    const onSaveCard = () => {
        dispatchCard({
            type: actions.SAVE_CARD,
            payload: {
                id: card!.id,
                name: 'sad',
                cardFields: fields,
            }
        })
        setDirty(false);
    }

    const onToggleAddForm = () => {
        setToggleAddForm((prev) => !prev);
    }

    return card ? (
        <main className='rounded-[4px] bg-white w-full flex flex-col '>
            {isShowForm && <FormField onToggleAddForm={onToggleAddForm} />}
            <Typography variant='h5' mb='5px'>Карточка</Typography>
            <div className='w-full h-0.5 bg-slate-200 rounded-[2px] mb-10' />
            <div className='flex flex-col gap-10 w-1/2 ' >
                <div className='grid grid-cols-2'>
                    <Typography variant='h5' mb='5px'><span className='truncate'>Название:</span></Typography>
                    <div className='flex gap-2'>
                        <OutlinedInput size='small' value={'192.168.1.1'} />
                        <Button children={<Add />} variant="contained" size="small" color='success' onClick={onToggleAddForm} />
                    </div>
                </div>
                {cardFields && cardFields.length > 0 && cardFields.map((field: DataField) => (
                    <div className='grid grid-cols-2' key={field.id}>
                        <Typography variant='h5' mb='5px' className='flex flex-1'>{field.name}:</Typography>
                        <div className='flex gap-2'>
                            <OutlinedInput size='small' value={field.value} />
                            <Button children={<RemoveIcon />} variant="contained" size="small" color='error' onClick={() => onDeleteField(field)} />
                            <Button children={<Add />} variant="contained" size="small" color='success' onClick={onToggleAddForm} />
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex gap-10 justify-center mt-auto'>
                <Button variant="contained" size="large" color='error' className='p-30'>Отменить</Button>
                <Button variant="contained" size="large" color='success' className='p-30' onClick={onSaveCard}>Сохранить</Button>
            </div>
        </main>
    ) : <>Такой карточки нет</>
}