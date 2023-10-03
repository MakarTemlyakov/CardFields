import { Button, Typography } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CardsContext, CardsDispatchContex, DataField } from '../../App';
import { useContext, useState } from 'react';
import { actions } from '../../actions/constatns';
import { DataCard } from '../../reducers/cardsReducer';
import { useParams } from 'react-router-dom';
import { FormField } from '../FormField/FormFiled';

type CardProps = {

    card: DataCard;
}



export const Card = () => {
    const { cardId } = useParams();
    const [isShowForm, setToggleAddForm] = useState(false);
    const dispatchCard = useContext(CardsDispatchContex);
    const { cards } = useContext(CardsContext);
    const card = cards.find((card) => card.id === +cardId!);
    const [fields, setFields] = useState(card?.cardFields);
    const [isDirty, setIsDirty] = useState(false);

    const onDeleteField = (field: DataField) => {
        setFields(fields?.filter((f) => f.id !== field.id));
    }



    const onSaveCard = () => {
        dispatchCard({
            type: actions.SAVE_CARD,
            payload: {
                id: card!.id,
                name: 'sad',
                cardFields: fields!,
            }
        })
        setIsDirty(true)
    }

    const onToggleAddForm = () => {
        setToggleAddForm((prev) => !prev);
    }

    const onAddDataField = (field: DataField) => {
        setFields([...fields!, field]);
        onToggleAddForm();
    }

    return card ? (
        <main className='rounded-[4px] bg-white w-full flex flex-col '>
            {isShowForm && <FormField onToggleAddForm={onToggleAddForm} onAddDataField={onAddDataField} />}
            <Typography variant='h5' mb='5px'>Карточка</Typography>
            <div className='w-full h-0.5 bg-slate-200 rounded-[2px] mb-10' />
            <div className='flex flex-col gap-10 w-1/2 ' >
                <div className='grid grid-cols-2'>
                    <Typography variant='h5' mb='5px'><span className='truncate'>Название:</span></Typography>
                    <div className='flex gap-2'>
                        <OutlinedInput size='small' value={card?.name} />
                        <Button children={<Add />} variant="contained" size="small" color='success' onClick={onToggleAddForm} />
                    </div>
                </div>
                {fields && fields.length > 0 && fields.map((field: DataField) => (
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
                <Button variant="contained" size="large" color='success' className='p-30' onClick={onSaveCard}>Сохранить</Button>
                <Button variant="contained" size="large" color='error' className='p-30'>Отменить</Button>
            </div>
        </main>
    ) : <>Такой карточки нет</>
}