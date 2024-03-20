import { DataField } from '../App';
import { actions } from '../actions/constatns';
import { UserAccount } from '../service/firebaseService';

type Payload<T> = T;

export type DataCard = {
  id: string;
  name: string;
  cardFields: DataField[];
};

export type User = {
  email: string;
  password: string;
};

export type UserAuth = UserAccount | null;

export type AppPayloadData = {
  card?: DataCard | null;
  cards?: DataCard[] | null;
  user?: User | null;
  userAuth?: UserAuth | null;
};

export type Action = {
  type: string;
  payload: Payload<AppPayloadData>;
};

interface AppState {
  user: UserAuth;
  cards: DataCard[];
  isShowFormAdd: boolean;
  isAuth: boolean;
}

export const initialAppState: AppState = {
  cards: [],
  isShowFormAdd: false,
  user: {
    id: '',
    email: null,
    accessToken: '',
  },
  isAuth: false,
};

export const appReducer = (state: AppState, action: Action): AppState => {
  let newState = { ...state };
  switch (action.type) {
    case actions.SAVE_CARD: {
      const card = newState.cards.find((c) => c.id === action.payload.card!.id);
      if (card) {
        const newCard = {
          ...card,
          cardFields: action.payload.card!.cardFields,
          name: action.payload.card!.name,
        };
        newState.cards = state.cards.map((c) => (c.id === action.payload.card!.id ? newCard : c));
        newState = { ...newState, cards: newState.cards };
        return newState;
      } else {
        newState = { ...newState, cards: [...newState.cards, action.payload.card!] };
      }

      return newState;
    }
    case actions.SET_DATA_CARDS: {
      const mappedCards = action.payload.cards!.map((card) => {
        return {
          ...card,
          cardFields: action.payload.card?.cardFields ? action.payload.card?.cardFields : [],
        };
      });

      return { ...newState, cards: mappedCards };
    }
    case actions.DELETE_CARD: {
      return { ...newState, cards: newState.cards.filter((c) => c.id !== action.payload.card!.id) };
    }
    case actions.AUTH_USER: {
      const userPayload = action.payload.userAuth!;
      newState = { ...newState, user: userPayload, isAuth: true };
      return newState;
    }

    case actions.SIGN_OUT_USER: {
      newState = { ...newState, user: { id: '', email: '', accessToken: '' }, isAuth: false };
      return newState;
    }

    default:
      return state;
  }
};
