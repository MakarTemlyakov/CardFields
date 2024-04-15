
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const Modal = ({ children, onToggleAddForm, title }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const onClickOutSide = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onToggleAddForm();
            }
        };

        document.addEventListener('click', onClickOutSide, true);

        return () => document.removeEventListener('click', onClickOutSide, true);

    }, [onToggleAddForm]);

    return <div className="z-[1] fixed w-[30%] w-min-[30%] bg-slate-700 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[4px] py-10 px-20" ref={modalRef}>
        <CloseIcon className='absolute -top-5 -right-5 cursor-pointer' onClick={onToggleAddForm} />
        <Typography variant='h5' mb='5px' className='dark:text-slate-300'>{title}</Typography>
        {children}
    </div>
}

export { Modal }