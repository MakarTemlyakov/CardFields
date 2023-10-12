import { DataField } from '../App';
import { actions } from '../actions/constatns';
import { UserAccount } from '../service/firebaseService';

type Payload<T> = T;

export type DataCard = {
  id: number;
  name: string;
  cardFields: DataField[];
};

export type Action = {
  type: string;
  payload: Payload<DataCard>;
};

type UserAuth = {
  user: UserAccount | null;
};

interface AppState {
  user: UserAuth;
  cards: DataCard[];
  isShowFormAdd: boolean;
}

export const initialAppState: AppState = {
  cards: [],
  isShowFormAdd: false,
  user: {
    user: null,
  },
};

export const cardsReducer = (state = initialAppState, action: Action) => {
  let newState = { ...state };
  switch (action.type) {
    case actions.SAVE_CARD: {
      const card = newState.cards.find((c) => c.id === action.payload.id);
      if (card) {
        const newCard = {
          ...card,
          cardFields: action.payload.cardFields,
          name: action.payload.name,
        };
        newState.cards = state.cards.map((c) => (c.id === action.payload.id ? newCard : c));
        newState = { ...newState, cards: newState.cards };
        return newState;
      } else {
        newState = { ...newState, cards: [...newState.cards, action.payload] };
      }

      return newState;
    }
    case actions.DELETE_CARD: {
      return { ...newState, cards: newState.cards.filter((c) => c.id !== action.payload.id) };
    }
    case actions.SET_AUTH_USER_DATA: {
      window.localStorage.setItem('user', JSON.stringify());
      return;
    }
    default:
      return state;
  }
};
