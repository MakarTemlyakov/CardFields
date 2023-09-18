import { DataField } from '../App';
import { actions } from '../actions/constatns';

type Payload<T> = T;

export type CardAction = {
  type: string;
  payload: Payload<DataCard>;
};

export type DataCard = {
  id: number;
  cardFields: DataField[];
};

export const cardsReducer = (cards: DataCard[], action: CardAction) => {
  switch (action.type) {
    case actions.SAVE_CARD: {
      const newCards = [...cards];
      const card = newCards.find((card) => card.id === action.payload.id);
      if (card) {
        const newCard = { ...card, cardFields: action.payload.cardFields };
        // TODO: Изменить логику для измнения текущей карточки с существующим id
        return newCards.map((card) => {
          if (card.id === newCard.id) {
            return {
              id: newCard.id,
              cardFields: newCard.cardFields,
            };
          } else {
            return card;
          }
        });
      } else {
        return [
          ...cards,
          {
            id: action.payload.id,
            cardFields: action.payload.cardFields,
          },
        ];
      }
    }
    default:
      return cards;
  }
};
