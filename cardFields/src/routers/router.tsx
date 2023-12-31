import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Card } from '../components/Card/Card';
import { CreateCard } from '../components/Card/CreateCard';
import { MainPage } from '../pages/MainPage/MainPage';
import { Index } from '../components/Index/Index';
import { AuthPage } from '../pages/AuthPage/AuthPage';



export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: '/cards', element: <MainPage />, children: [
          { index: true, element: <Index /> },
          { path: ':cardId', element: <Card /> },
          { path: "create", element: <CreateCard /> },
        ]
      },
      { path: '/auth', element: <AuthPage /> }
    ],
    errorElement: <div>Страница не найдена</div>
  },
]);


