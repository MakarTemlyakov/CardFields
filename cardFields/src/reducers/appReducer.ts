import { actions } from '../actions/constatns';
import { Action, AppState } from '../providers/AppProvider';

export const appReducer = (state: AppState, action: Action): AppState => {
  let newState = { ...state };
  switch (action.type) {
    case actions.SAVE_CARD: {
      const card = newState.cards.find((c) => c.id === action.payload?.card!.id);
      if (card) {
        const newCard = {
          ...card,
          cardFields: action.payload?.card!.cardFields,
          name: action.payload?.card!.name,
        };
        newState.cards = state.cards.map((c) => (c.id === action.payload?.card!.id ? newCard : c));
        newState = { ...newState, cards: newState.cards };
        return newState;
      } else {
        newState = { ...newState, cards: [...newState.cards, action.payload?.card!] };
      }

      return newState;
    }
    case actions.SET_DATA_CARDS: {
      const mappedCards = action.payload?.cards!.map((card) => {
        return {
          ...card,
          cardFields: card.cardFields ? card.cardFields : [],
        };
      });
      return { ...newState, cards: mappedCards };
    }
    case actions.DELETE_CARD: {
      return {
        ...newState,
        cards: newState.cards.filter((c) => c.id !== action.payload?.card!.id),
      };
    }

    case actions.AUTH_USER: {
      const userPayload = action.payload?.userAuth;

      window.localStorage.setItem('user', JSON.stringify(userPayload));

      newState = { ...newState, user: userPayload, isAuth: true };

      return newState;
    }

    case actions.SIGN_OUT_USER: {
      window.localStorage.removeItem('user');
      newState = { ...newState, user: null, isAuth: false };
      return newState;
    }

    case actions.TOGGLE_THEME: {
      if (newState.theme === 'dark') {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
        newState.theme = localStorage.theme;
      } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
        newState.theme = localStorage.theme;
      }
      return newState;
    }

    default:
      return state;
  }
};
