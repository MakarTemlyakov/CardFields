import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { CardItems } from '../components/CardItems/CardItems';
import { Card } from '../components/Card/Card';
import { CreateCard } from '../components/Card/CreateCard';



export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: '/cards', element: <CardItems /> },
      { path: '/cards/:cardId', element: <Card /> },
      { path: '/cards/create', element: <CreateCard /> },
    ],
    errorElement: <div>Страница не найдена</div>
  },
]);


