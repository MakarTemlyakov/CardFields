import { useContext, useEffect } from 'react';
import { AppContext, AppDispatchContext } from '../App';
import { actions } from '../actions/constatns';

export const useIsAuth = () => {
    const { isAuth } = useContext(AppContext);
    const dispatch = useContext(AppDispatchContext);
    const storageUser = window.localStorage.getItem('user');

    useEffect(() => {
        if (!isAuth && storageUser) {
            dispatch({
                type: actions.SET_LOCAL_USER_DATA,
                payload: {
                    userAuth: JSON.parse(storageUser),
                }
            });
        }
    }, [storageUser, isAuth, dispatch]);

    return isAuth;
}