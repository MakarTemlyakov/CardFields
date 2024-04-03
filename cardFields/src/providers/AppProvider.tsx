import React, { Dispatch, createContext, useEffect, useReducer } from "react";
import { appReducer } from "../reducers/appReducer";
import { onAuthStateChanged } from "firebase/auth";
import { UserAccount, auth } from "../service/firebaseService";
import { actions } from "../actions/constatns";

type Payload<T> = T;

export type DataField = {
    id: string;
    name: string;
    value: string;
}

export type DataCard = {
    id: string;
    name: string;
    cardFields: DataField[];
};

export type User = {
    email: string;
    password: string;
};

export type UserAuth = UserAccount | null;

export type AppPayloadData = {
    card?: DataCard;
    cards?: DataCard[];
    user?: User;
    userAuth?: UserAuth;
};

export type Action = {
    type: string;
    payload?: Payload<AppPayloadData>;
};

export interface AppState {
    user?: UserAuth;
    cards: DataCard[];
    isAuth: boolean;
}

type AppContextType = {
    state: AppState;
    dispatch: Dispatch<Action>;
}

const initialAppState: AppContextType = {
    state: {
        cards: [],
        user: null,
        isAuth: false,
    },
    dispatch: () => ({}) as Dispatch<Action>,
};

export const AppContext = createContext<AppContextType>(initialAppState);


const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(
        appReducer,
        initialAppState.state,
    );

    console.log({ state1: state })
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const user = {
                    id: firebaseUser.uid,
                    email: firebaseUser.email,
                    accessToken: await firebaseUser.getIdToken(),
                }
                dispatch({
                    type: actions.AUTH_USER,
                    payload: {
                        userAuth: user
                    },
                })
            } else {
                dispatch({
                    type: actions.SIGN_OUT_USER,
                    payload: {
                        userAuth: {
                            id: '',
                            email: '',
                            accessToken: '',
                        },
                    }
                });

            }
        })
        return () => unsubscribe();
    }, [dispatch])

    return <AppContext.Provider value={{ state, dispatch }}>
        {children}
    </AppContext.Provider>
}

export { AppProvider };
