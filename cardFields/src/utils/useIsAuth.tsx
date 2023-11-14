import { useContext, useEffect, useState } from 'react';
import { AppDispatchContext } from '../App';
import { actions } from '../actions/constatns';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../service/firebaseService';




const userData: any = null;

export const useIsAuth = () => {
    const dispatch = useContext(AppDispatchContext);
    const [currentUser, setCurrentUser] = useState(userData);

    useEffect(() => {
        return onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user.uid);
                dispatch({
                    type: actions.AUTH_USER,
                    payload: {
                        userAuth: {
                            id: user.uid,
                            email: user.email,
                            accessToken: await user.getIdToken(),
                        },
                    }
                });

            } else {
                setCurrentUser(null);
            }
        });

    }, [dispatch]);

    return currentUser;
}