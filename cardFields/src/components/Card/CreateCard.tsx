import { useState } from "react";

import RemoveIcon from '@mui/icons-material/Remove';
import Add from "@mui/icons-material/Add";
import { DataField } from "../../App";
import { FormField } from "../FormField/FormFiled";
import { Button, OutlinedInput, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { firebaseApi } from "../../api/firebaseApi";


export const CreateCard = () => {
    const [name, setName] = useState('');
    const [isShowForm, setToggleAddForm] = useState(false);
    const [fields, setFields] = useState<DataField[]>([]);
    const navigate = useNavigate();

    const onDeleteField = (field: DataField) => {
        setFields(fields?.filter((f: DataField) => f.id !== field.id));
    }

    const onSaveCard = async () => {
        const cardId = await firebaseApi.createCard(name, fields);
        if (cardId) {
            navigate(`/cards/${cardId}`);
        }
    }

    const onToggleAddForm = () => {
        setToggleAddForm((prev) => !prev);
    }

    const onAddDataField = (field: DataField) => {
        setFields([...fields!, field]);
        onToggleAddForm();
    }

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setName(name);
    }

    return (
        <main className='rounded-[4px] bg-lightgray w-full flex flex-col min-h-screen'>
            {isShowForm && <FormField onToggleAddForm={onToggleAddForm} onAddDataField={onAddDataField} countFields={fields.length} />}
            <Typography variant='h5' mb='5px'>Карточка</Typography>
            <div className='w-full h-0.5 bg-slate-200 rounded-[2px] mb-10' />
            <div className='flex flex-col gap-10 w-1/2 ' >
                <div className='grid grid-cols-2'>
                    <Typography variant='h5' mb='5px'><span className='truncate'>Название:</span></Typography>
                    <div className='flex gap-2'>
                        <OutlinedInput size='small' value={name} onChange={onChangeName} />
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
    )
}