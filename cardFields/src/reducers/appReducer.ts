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

export const appReducer = (state: AppState, action: Action) => {
  let newState = { ...state };
  console.log(state);
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
      console.log({ SET_DATA_CARDS: action.payload.cards });
      return { ...newState, cards: action.payload.cards };
    }
    case actions.DELETE_CARD: {
      return { ...newState, cards: newState.cards.filter((c) => c.id !== action.payload.card!.id) };
    }
    case actions.SET_AUTH_USER_DATA: {
      const userPayload = action.payload.userAuth!;
      window.localStorage.setItem('user', JSON.stringify(userPayload));
      newState = { ...newState, user: userPayload, isAuth: true };
      return newState;
    }
    case actions.SET_LOCAL_USER_DATA: {
      const user = action.payload.userAuth!;
      newState = { ...newState, user, isAuth: true };
      return newState;
    }
    default:
      return state;
  }
};
