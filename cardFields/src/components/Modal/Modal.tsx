
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { useEffect, useRef, ReactNode } from 'react';

type ModalType = {
    children: ReactNode;
    title?: string;
    onChangeModalStatus: () => void;
}

const Modal = ({ children, onChangeModalStatus, title }: ModalType) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const onClickOutSide = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onChangeModalStatus();
            }
        };

        document.addEventListener('click', onClickOutSide, true);

        return () => document.removeEventListener('click', onClickOutSide, true);

    }, [onChangeModalStatus]);

    return (
        <div className='fixed bg-black/70 top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center z-10'>
            <div className="z-[1] fixed w-[30%] w-min-[30%] bg-slate-200 dark:bg-slate-700 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[4px] py-10 px-20" ref={modalRef}>
                <CloseIcon className='absolute -top-5 -right-5 cursor-pointer' onClick={onChangeModalStatus} />
                <Typography variant='h5' mb='5px' className='dark:text-slate-300'>{title}</Typography>
                <div className='w-full h-0.5 bg-slate-200 rounded-[2px] mb-5 dark:bg-slate-400' />
                {children}
            </div>
        </div>)

}

export { Modal }