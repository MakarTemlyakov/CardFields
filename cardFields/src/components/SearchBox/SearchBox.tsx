import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';

type SearchBoxProps = {
    searchValue?: string;
    onSearch: (searchValue: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ onSearch, searchValue }) => {
    const [value, setSearchValue] = useState(searchValue || '');

    useEffect(() => {
        onSearch(value);
    }, [value, onSearch])

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        setSearchValue(value);
    }

    const onReset = () => {
        setSearchValue('');
    }

    return <TextField value={value} label="Search" variant='outlined' size='small' className='w-full' onChange={onChange} InputProps={{
        endAdornment: (
            < InputAdornment position="end">
                <ClearIcon className="cursor-pointer " />
            </ InputAdornment>
        ),
        onClick: onReset,
    }} />;
}

export { SearchBox };