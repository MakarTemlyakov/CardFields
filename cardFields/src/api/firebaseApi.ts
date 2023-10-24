import { DataField } from '../App';
import { OnLoadData } from '../pages/MainPage/MainPage';
import { DataCard } from '../reducers/appReducer';
import { firebaseService } from '../service/firebaseService';

export type User = {
  email: string;
  password: string;
};

const firebaseApi = {
  signIn: async (user: User) => await firebaseService.signIn(user.email, user.password),

  createCard: async (name: string, cardFields: DataField[]) =>
    await firebaseService.createCard(name, cardFields),

  getCardById: async (id: string) => await firebaseService.getCardById(id),

  getCards: async (onSetDataCards: OnLoadData) => await firebaseService.getCards(onSetDataCards),

  deleteCardById: async (cardId: string) => await firebaseService.deleteCardById(cardId),

  updateCardById: async (card: DataCard) => await firebaseService.updateCardById(card),
};

export { firebaseApi };
