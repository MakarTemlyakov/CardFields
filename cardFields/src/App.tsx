

import { useState, createContext, useReducer, Dispatch } from 'react';
import './index.css'

import { FormField } from './components/FormField/FormFiled';
import { Card } from './components/Card/Card';
import { Action, fieldsRedcuer } from './reducers/fieldsReducer';

export type DataField = {
  id: number;
  name: string;
  value: string;
}

const fields: DataField[] = [];


export const FieldsContext = createContext(fields);
export const FieldsDispatchContext = createContext<Dispatch<Action>>(() => { });

function App() {
  const [fields, dispatch] = useReducer(
    fieldsRedcuer,
    []
  );
  const [isShowFormAdd, setShowFormAdd] = useState(false);

  const onToggleAddForm = () => {
    setShowFormAdd(() => !isShowFormAdd);
  }




  return (
    <>
      <FieldsContext.Provider value={fields}>
        <FieldsDispatchContext.Provider value={dispatch}>
          <Card onShowAddForm={onToggleAddForm} fields={fields} />
          {isShowFormAdd && <FormField onToggleAddForm={onToggleAddForm} />}
        </FieldsDispatchContext.Provider>
      </FieldsContext.Provider>
    </>
  )
}

export default App
