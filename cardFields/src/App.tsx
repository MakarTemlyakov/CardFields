

import { useState, createContext, useReducer, Dispatch } from 'react';
import './index.css'

import { FormField } from './components/FormField/FormFiled';
import { Card } from './components/Card/Card';
import { Action, fieldsRedcuer } from './reducers/fieldsReducer';
import { DataCard, cardsReducer, CardAction } from './reducers/cardsReducer';

export type DataField = {
  id: number;
  name: string;
  value: string;
}

const fields: DataField[] = [];
const cards: DataCard[] = [];

export const FieldsContext = createContext(fields);
export const CardsContext = createContext(cards);
export const CardsDispatchContex = createContext<Dispatch<CardAction>>(() => { });
export const FieldsDispatchContext = createContext<Dispatch<Action>>(() => { });

function App() {
  const [fields, dispatchField] = useReducer(
    fieldsRedcuer,
    []
  );
  const [cards, dispatchCard] = useReducer(
    cardsReducer,
    []
  );
  const [isShowFormAdd, setShowFormAdd] = useState(false);

  const onToggleAddForm = () => {
    setShowFormAdd(() => !isShowFormAdd);
  }


  console.log(cards);

  return (
    <>
      <FieldsContext.Provider value={fields}>
        <FieldsDispatchContext.Provider value={dispatchField}>
          <CardsContext.Provider value={cards}>
            <CardsDispatchContex.Provider value={dispatchCard}>
              <Card onShowAddForm={onToggleAddForm} />
              {isShowFormAdd && <FormField onToggleAddForm={onToggleAddForm} />}
            </CardsDispatchContex.Provider>
          </CardsContext.Provider>
        </FieldsDispatchContext.Provider>
      </FieldsContext.Provider>
    </>
  )
}

export default App
