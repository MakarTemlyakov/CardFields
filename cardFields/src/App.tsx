

import { useState } from 'react';
import './index.css'

import { FormField } from './components/FormField/FormFiled';
import { Card } from './components/Card/Card';

function App() {
  const [isShowFormAdd, setShowFormAdd] = useState(false);


  const onToggleAddForm = () => {
    setShowFormAdd(() => !isShowFormAdd);
  }

  console.log(isShowFormAdd);

  return (
    <>
      <Card onShowAddForm={onToggleAddForm} />
      {isShowFormAdd && <FormField onShowAddForm={onToggleAddForm} />}
    </>
  )
}

export default App
