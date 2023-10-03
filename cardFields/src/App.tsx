

import { createContext, useReducer, Dispatch } from 'react';
import './index.css'


import { Action, fieldsRedcuer } from './reducers/fieldsReducer';
import { cardsReducer, CardAction, initialCards } from './reducers/cardsReducer';
import { CardItems } from './components/CardItems/CardItems';
import { Button, TextField, } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';




export type DataField = {
  id: number;
  name: string;
  value: string;
}

const fields: DataField[] = [];

export const FieldsContext = createContext(fields);
export const CardsContext = createContext(initialCards);
export const CardsDispatchContex = createContext<Dispatch<CardAction>>(() => { });
export const FieldsDispatchContext = createContext<Dispatch<Action>>(() => { });

function App() {
  const [fields, dispatchField] = useReducer(
    fieldsRedcuer,
    []
  );
  const [state, dispatchCard] = useReducer(
    cardsReducer,
    initialCards
  );

  return (
    <div className='w-[95%] m-auto'>
      <div className='grid grid-cols-[20%_1fr] h-full gap-20 p-2'>
        <FieldsContext.Provider value={fields}>
          <FieldsDispatchContext.Provider value={dispatchField}>
            <CardsContext.Provider value={state}>
              <CardsDispatchContex.Provider value={dispatchCard}>
                <div className="grid grid-rows-[auto_1fr] gap-4">
                  <div className='flex gap-2 justify-between'>
                    <TextField label="Search" variant='outlined' size='small' />
                    <Link to={'/cards/create'}><Button variant="contained" color="info">ADD Card</Button></Link>
                  </div>
                  <div>
                    <CardItems />
                  </div>
                </div>
                <Outlet />
              </CardsDispatchContex.Provider>
            </CardsContext.Provider>
          </FieldsDispatchContext.Provider>
        </FieldsContext.Provider>
      </div>

    </div >
  )
}

export default App
