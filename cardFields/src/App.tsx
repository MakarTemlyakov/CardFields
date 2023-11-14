
import { appReducer, Action, initialAppState } from './reducers/appReducer';
import { actions } from './actions/constatns';
import { auth } from './service/firebaseService';
import { firebaseApi } from './api/firebaseApi';

import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useReducer, Dispatch, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import './index.css'

export type DataField = {
  id: number;
  name: string;
  value: string;
}

export const AppContext = createContext(initialAppState!);
export const AppDispatchContext = createContext<Dispatch<Action>>(() => { });

function App() {
  const [state, dispatch] = useReducer(
    appReducer,
    initialAppState
  );
  const dispatchAction = useContext(AppDispatchContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatchAction({
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
        await firebaseApi.loginOut();
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
      }
    });

  }, [dispatchAction]);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <Outlet />
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  )
}

export default App
