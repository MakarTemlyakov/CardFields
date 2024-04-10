import { Button, TextField, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { FocusEvent, useState, useEffect, useRef } from 'react';
import { DataField, } from '../../App';
import CloseIcon from '@mui/icons-material/Close';
import { useGenerateId } from '../../utils/getUniqueId';

type Field = {
    isDirty: boolean;
    value: string;
    color: 'primary' | 'error' | 'success';
    isError: boolean;
};

interface CustomField extends Record<string, unknown> {
    fieldName: Field;
    fieldValue: Field;
}

type FormFieldProps = {
    onToggleAddForm: () => void;
    onAddDataField: (field: DataField) => void;
    countFields: number;
}



export const FormField: React.FC<FormFieldProps> = ({ onToggleAddForm, onAddDataField, countFields }) => {
    const field: CustomField = {
        fieldName: { isDirty: false, value: '', isError: false, color: 'primary' },
        fieldValue: { isDirty: false, value: '', color: 'primary', isError: false }
    };
    const [values, setValues] = useState(field);
    const modalRef = useRef<HTMLDivElement>(null);
    const id = useGenerateId(countFields);

    useEffect(() => {
        const onClickOutSide = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onToggleAddForm();
            }
        };

        document.addEventListener('click', onClickOutSide, true);

        return () => document.removeEventListener('click', onClickOutSide, true);

    }, [onToggleAddForm]);




    const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        const field = values[fieldName] as Field;
        const isError = !fieldValue && field.isDirty;

        if (!fieldValue) {
            field.color = "error";
        } else if (fieldValue) {
            field.color = 'success';
        }

        const customField: CustomField = { ...values, [fieldName]: { ...field, value: fieldValue, color: field.color, isError } };

        setValues(customField);
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const field: DataField = { id, name: values.fieldName.value, value: values.fieldValue.value };
        onResetForm();
        onAddDataField(field);
    }

    const onResetForm = () => {
        setValues(field);
    }


    const isDisabled = (): boolean => {
        return !values.fieldName.value || !values.fieldValue.value;
    }

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const field: Field = values[key] as Field;
        let isError = true;
        if (e.target.value) {
            isError = false;
        }

        const customField: CustomField = { ...values, [key]: { ...field, isDirty: true, isError } };
        setValues(customField);
    }

    const onFocus = (e: FocusEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const field: Field = values[key] as Field;
        const customField: CustomField = { ...values, [key]: { ...field, color: field.color = 'primary' } };
        setValues(customField);
    }

    return (
        <div className="fixed bg-black/70 top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center z-10 " >
            <div className='flex flex-col w-1/3 rounded-[4px] bg-white py-10 px-20 relative dark:bg-slate-800' ref={modalRef}>
                <CloseIcon className='absolute -top-5 -right-5 cursor-pointer' onClick={onToggleAddForm} />
                <Typography variant='h5' mb='5px' className='dark:text-slate-300'>Форма добавления</Typography>
                <div className='w-full h-0.5 bg-slate-200 rounded-[2px] mb-10 dark:bg-slate-700' />
                <form className='flex flex-col gap-5 items-center ' >
                    <TextField onFocus={onFocus} error={values.fieldName.isError} color={values.fieldName.color} onBlur={onBlur} name="fieldName" id='outlinded-basic' label='Имя поля' variant='outlined' size='small' fullWidth onChange={onChangeEvent} value={values.fieldName.value} InputProps={{
                        classes: {
                            root: 'dark:bg-slate-700 dark:text-slate-300'
                        }
                    }} InputLabelProps={{
                        classes: {
                            root: 'dark:text-slate-400'
                        }
                    }} />
                    <TextField onFocus={onFocus} error={values.fieldValue.isError} color={values.fieldValue.color} onBlur={onBlur} name="fieldValue" id='outlinded-basic' label='Значение поля' variant='outlined' size='small' fullWidth onChange={onChangeEvent} value={values.fieldValue.value} InputProps={{
                        classes: {
                            root: 'dark:bg-slate-700 dark:text-slate-300'
                        }
                    }} InputLabelProps={{
                        classes: {
                            root: 'dark:text-slate-400 '
                        }
                    }} />
                    <div className='flex flex-wrap justify-center gap-5 w-full lg:flex-nowrap' >
                        <Button variant="contained" color="success" fullWidth size='large' startIcon={<DoneIcon />} onClick={onSubmit} disabled={isDisabled()}>
                            Save Field
                        </Button>
                        <Button variant="contained" color="info" fullWidth size='large' startIcon={<DeleteOutlineOutlinedIcon />} onClick={onResetForm} >
                            Reset Field
                        </Button>
                    </div>
                </form>
            </div>
        </div>


    )
}