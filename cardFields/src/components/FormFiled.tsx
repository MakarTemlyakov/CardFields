import { Button, TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { FocusEvent, useState } from 'react';



type Field = {
    isDirty: boolean;
    value: string;
    color: "primary" | "error" | "success";
    isError: boolean;
}


interface CustomField extends Record<string, unknown> {
    fieldName: Field;
    fieldValue: Field;
}

export const FormField = () => {
    const field = { fieldName: { isDirty: false, value: '', isError: false, color: 'primary' }, fieldValue: { isDirty: false, value: '', color: 'primary', isError: false } } as CustomField;
    const [values, setValues] = useState(field);


    const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;

        const field: Field = values[fieldName] as Field;
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
        const fieldValues = values;
        console.log(fieldValues);
        onResetForm();
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

        <form className='w-1/3 bg-white p-20 rounded-[4px] flex flex-col gap-5 items-center' >
            <TextField onFocus={onFocus} error={values.fieldName.isError} color={values.fieldName.color} onBlur={onBlur} name="fieldName" id='outlinded-basic' label='Имя поля' variant='outlined' size='small' fullWidth onChange={onChangeEvent} value={values.fieldName.value} />
            <TextField onFocus={onFocus} error={values.fieldValue.isError} color={values.fieldValue.color} onBlur={onBlur} name="fieldValue" id='outlinded-basic' label='Значение поля' variant='outlined' size='small' fullWidth onChange={onChangeEvent} value={values.fieldValue.value} />
            <div className='flex flex-wrap justify-center gap-5 w-full lg:flex-nowrap' >
                <Button variant="contained" color="success" fullWidth size='large' startIcon={<DoneIcon />} onClick={onSubmit} disabled={isDisabled()}>
                    Success
                </Button>
                <Button variant="contained" color="info" fullWidth size='large' startIcon={<DeleteOutlineOutlinedIcon />} onClick={onResetForm} >
                    Reset
                </Button>
            </div>
        </form>

    )
}