
import { Outlet } from 'react-router-dom';

import './index.css'
import { AppProvider } from './providers/AppProvider';


function App() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  )
}

export default App
