import { OnLoadData } from '../pages/MainPage/MainPage';
import { DataCard, DataField } from '../providers/AppProvider';
import { firebaseService } from '../service/firebaseService';

export type User = {
  email: string;
  password: string;
};

const firebaseApi = {
  signIn: async (user: User) => await firebaseService.signIn(user.email, user.password),

  loginOut: async () => await firebaseService.loginOut(),

  createCard: async (name: string, cardFields: DataField[]) =>
    await firebaseService.createCard(name, cardFields),

  getCardById: async (id: string) => await firebaseService.getCardById(id),

  getCards: async (onSetDataCards: OnLoadData) => await firebaseService.getCards(onSetDataCards),

  deleteCardById: async (cardId: string) => await firebaseService.deleteCardById(cardId),

  updateCardById: async (card: DataCard) => await firebaseService.updateCardById(card),

  deleteAllCards: async () => await firebaseService.deleteAllCards(),
};

export { firebaseApi };
