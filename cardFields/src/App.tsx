
import { appReducer, Action, initialAppState } from './reducers/appReducer';
import { createContext, useReducer, Dispatch } from 'react';
import { Outlet } from 'react-router-dom';

import './index.css'
import { AuthProvider } from './providers/AuthProvider';

export type DataField = {
  id: string;
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

  return (
    <AuthProvider>
      <AppContext.Provider value={state}>
        <AppDispatchContext.Provider value={dispatch}>
          <Outlet />
        </AppDispatchContext.Provider>
      </AppContext.Provider>
    </AuthProvider>
  )
}

export default App
