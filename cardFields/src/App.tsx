

import { createContext, useReducer, Dispatch } from 'react';
import './index.css'

import { cardsReducer, CardAction, initialCards } from './reducers/appReducer';
import { CardItems } from './components/CardItems/CardItems';
import { Button, TextField, } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';


export type DataField = {
  id: number;
  name: string;
  value: string;
}

export const CardsContext = createContext(initialCards);
export const CardsDispatchContex = createContext<Dispatch<CardAction>>(() => { });

function App() {
  const [state, dispatchCard] = useReducer(
    cardsReducer,
    initialCards
  );

  return (
    <div className='flex flex-col'>
      <div className='w-[95%] mx-auto'>
        <div className='grid grid-cols-[20%_1fr] gap-20 p-2 min-h-screen'>
          <FieldsContext.Provider value={fields}>
            <FieldsDispatchContext.Provider value={dispatchField}>
              <CardsContext.Provider value={state}>
                <CardsDispatchContex.Provider value={dispatchCard}>
                  <div className="flex flex-col gap-5">
                    <div className='flex gap-2 justify-between'>
                      <TextField label="Search" variant='outlined' size='small' />
                      <Link to={'/cards/create'}><Button variant="contained" color="info">ADD Card</Button></Link>
                    </div>
                    <div className="bg-[lightgrey] rounded-sm  relative  h-1/4">
                      <CardItems />
                    </div>
                  </div>
                  <Outlet />
                </CardsDispatchContex.Provider>
              </CardsContext.Provider>
            </FieldsDispatchContext.Provider>
          </FieldsContext.Provider>
        </div>
      </div>

    </div>
  )
}

export default App
