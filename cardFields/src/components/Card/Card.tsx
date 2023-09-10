import { Button, Typography } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DataField, FieldsContext, FieldsDispatchContext } from '../../App';
import { useContext } from 'react';
import { actions } from '../../actions/constatns';



type CardProps = {
    fields: DataField[];
    onShowAddForm: () => void;
}

export const Card: React.FC<CardProps> = ({ onShowAddForm }) => {
    const fields = useContext(FieldsContext);
    const dispatch = useContext(FieldsDispatchContext);

    const onDeleteField = (field: DataField) => {
        dispatch({
            type: actions.DELETE,
            payload: {
                id: field.id,
                name: field.name,
                value: field.value,
            }
        });
    }

    console.log(fields)
    return (
        <main className='rounded-[4px] bg-white py-10 px-20  w-full h-full flex flex-col '>
            <Typography variant='h5' mb='5px'>Карточка</Typography>
            <div className='w-full h-0.5 bg-slate-200 rounded-[2px] mb-10' />
            <div className='flex flex-col gap-10 w-1/2 h-full' >
                <div className='grid grid-cols-2'>
                    <Typography variant='h5' mb='5px'><span className='truncate'>Наименование карточки:</span></Typography>
                    <div className='flex gap-2'>
                        <OutlinedInput size='small' value={'192.168.1.1'} />
                        <Button children={<Add />} variant="contained" size="small" color='success' onClick={() => onShowAddForm()} />
                    </div>
                </div>
                {fields.length > 0 && fields.map((field: DataField) => (
                    <div className='grid grid-cols-2' key={field.id}>
                        <Typography variant='h5' mb='5px' className='flex flex-1'>{field.name}:</Typography>
                        <div className='flex gap-2'>
                            <OutlinedInput size='small' value={field.value} />
                            <Button children={<RemoveIcon />} variant="contained" size="small" color='error' onClick={() => onDeleteField(field)} />
                            <Button children={<Add />} variant="contained" size="small" color='success' onClick={() => onShowAddForm()} />
                        </div>
                    </div>
                ))}
                <div className='flex gap-10 justify-center mt-auto'>
                    <Button variant="contained" size="large" color='error' className='p-30'>Отменить</Button>
                    <Button variant="contained" size="large" color='success' className='p-30'>Сохранить</Button>
                </div>
            </div>
        </main>
    )
}