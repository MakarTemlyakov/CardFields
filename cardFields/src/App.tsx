

import { useState, createContext, useReducer, Dispatch } from 'react';
import './index.css'

import { FormField } from './components/FormField/FormFiled';
import { Action, fieldsRedcuer } from './reducers/fieldsReducer';
import { cardsReducer, CardAction, initialCards } from './reducers/cardsReducer';
import { Cards } from './components/Cards/Cards';

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
  const [cards, dispatchCard] = useReducer(
    cardsReducer,
    initialCards
  );

  const [isShowFormAdd, setShowFormAdd] = useState(false);

  const onToggleAddForm = () => {
    setShowFormAdd(() => !isShowFormAdd);
  }


  console.log(cards);

  return (
    <div className='w-4/5 flex flex-col grow m-auto p-5'>
      <FieldsContext.Provider value={fields}>
        <FieldsDispatchContext.Provider value={dispatchField}>
          <CardsContext.Provider value={initialCards}>
            <CardsDispatchContex.Provider value={dispatchCard}>
              <Cards cards={cards.cards} />
              {isShowFormAdd && <FormField onToggleAddForm={onToggleAddForm} />}
            </CardsDispatchContex.Provider>
          </CardsContext.Provider>
        </FieldsDispatchContext.Provider>
      </FieldsContext.Provider>
    </div>
  )
}

export default App
