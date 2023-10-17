

import { createContext, useReducer, Dispatch } from 'react';
import './index.css'

import { appReducer, Action, initialAppState } from './reducers/appReducer';
import { Outlet } from 'react-router-dom';



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
  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <Outlet />
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  )
}

export default App
