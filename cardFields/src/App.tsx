

import { useState, createContext, useReducer, Dispatch } from 'react';
import './index.css'

import { FormField } from './components/FormField/FormFiled';
import { Action, fieldsRedcuer } from './reducers/fieldsReducer';
import { cardsReducer, CardAction, initialCards } from './reducers/cardsReducer';
import { CardItems } from './components/CardItems/CardItems';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';



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

  const [isShowFormAdd, setShowFormAdd] = useState(false);

  const onToggleAddForm = () => {
    setShowFormAdd(() => !isShowFormAdd);
  }

  return (
    <div className='w-4/5 flex flex-col grow m-auto mt-10'>
      <FieldsContext.Provider value={fields}>
        <FieldsDispatchContext.Provider value={dispatchField}>
          <CardsContext.Provider value={state}>
            <CardsDispatchContex.Provider value={dispatchCard}>
              <div className="flex flex-col h-full items-start gap-5">
                <Link to={'cards/create'}><Button variant='contained' color='primary'>ADD Card</Button></Link>
                <CardItems cards={state.cards} />
                {isShowFormAdd && <FormField onToggleAddForm={onToggleAddForm} />}
              </div>
            </CardsDispatchContex.Provider>
          </CardsContext.Provider>
        </FieldsDispatchContext.Provider>
      </FieldsContext.Provider>
    </div>
  )
}

export default App
