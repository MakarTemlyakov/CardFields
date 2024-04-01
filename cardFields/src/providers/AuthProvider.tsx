import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../service/firebaseService";
import { AppDispatchContext } from "../App";
import { actions } from "../actions/constatns";


type UserAuth = {
    id: string;
    email: string | null;
    accessToken: string;
};

type AuthContextType = {
    user: UserAuth | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatchAction = useContext(AppDispatchContext);
    const [user, setUser] = useState<UserAuth | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const user = {
                    id: firebaseUser.uid,
                    email: firebaseUser.email,
                    accessToken: await firebaseUser.getIdToken(),
                }
                dispatchAction({
                    type: actions.AUTH_USER,
                    payload: {
                        userAuth: user
                    },
                })
                setUser(user)
            } else {
                dispatchAction({
                    type: actions.AUTH_USER,
                    payload: {
                        userAuth: {
                            id: '',
                            email: '',
                            accessToken: '',
                        },
                    }
                });
                setUser(null);
            }
        })
        return () => unsubscribe();
    }, [dispatchAction])
    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
