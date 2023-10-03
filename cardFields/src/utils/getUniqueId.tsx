import { useEffect, useState } from 'react';

export const useGenerateId = (lastOfIndex: number) => {
    const [id, setId] = useState(0);

    useEffect(() => {
        if (lastOfIndex !== id) {
            setId(lastOfIndex);
        }
    }, [lastOfIndex, id])
    return id;
}