import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Card } from '../components/Card/Card';
import { CreateCard } from '../components/Card/CreateCard';
import { Index } from '../components/Index/Index';
import { AuthForm } from '../components/AuthForm/AuthForm';



export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index /> },
    ],
    errorElement: <div>Страница не найдена</div>
  },
  {
    path: '/cards', element: <App />, children: [
      { path: ':cardId', element: <Card /> },
      { path: "create", element: <CreateCard /> },
    ],
  },
  {
    path: '/auth', element: <AuthForm />
  }
]);


