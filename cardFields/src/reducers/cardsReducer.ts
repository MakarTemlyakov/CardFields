import { DataField } from '../App';
import { actions } from '../actions/constatns';

type Payload<T> = T;

export type DataCard = {
  id: number;
  name: string;
  cardFields: DataField[];
};

export type CardAction = {
  type: string;
  payload: Payload<DataCard>;
};

interface CardsState {
  cards: DataCard[];
  isShowFormAdd: boolean;
}

export const initialCards: CardsState = {
  cards: [],
  isShowFormAdd: false,
};

export const cardsReducer = (state = initialCards, action: CardAction) => {
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
        console.log({ newState });
        return newState;
      } else {
        newState = { ...newState, cards: [...newState.cards, action.payload] };
      }

      return newState;
    }
    case actions.DELETE_CARD: {
      return { ...newState, cards: newState.cards.filter((c) => c.id !== action.payload.id) };
    }
    default:
      return state;
  }
};
