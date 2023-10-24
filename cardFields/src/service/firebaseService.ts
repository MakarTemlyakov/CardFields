import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { remove, getDatabase, onValue, push, ref, update } from 'firebase/database';
import { DataField } from '../App';
import { DataCard } from '../reducers/appReducer';
import { OnLoadData } from '../pages/MainPage/MainPage';

export type UserAccount = {
  id: string;
  email: string | null;
  accessToken: string;
};

type UserResponse = {
  user: UserAccount | null;
  error: string | null;
};

const firebaseConfig: FirebaseOptions = {
  projectId: PROJECT_ID,
  apiKey: FIRESTORE_API_KEY,
  databaseURL: DB_URL,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getDatabase(app);

const firebaseService = {
  signUp: async (email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
  },
  signIn: async (email: string, password: string) => {
    let response: UserResponse = { user: null, error: null };

    try {
      const responseData = await signInWithEmailAndPassword(auth, email, password);
      const userData = responseData.user;
      const token = await responseData.user.getIdToken();

      const dataUser: UserAccount = {
        id: userData.uid,
        email: userData.email,
        accessToken: token,
      };

      response = { user: dataUser, error: null };
      return response;
    } catch (error) {
      response = { user: null, error: 'Ошибка сервера' };
      return response;
    }
  },

  getCardById: async (cardId: string) => {
    const cardRef = ref(db, 'cards/' + cardId);
    onValue(cardRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  },

  getCards: async (onSetDataCards: OnLoadData) => {
    const cardRef = ref(db, 'cards');

    let data = [];

    return onValue(cardRef, (snapshot) => {
      if (snapshot.exists()) {
        const cards = snapshot.val();
        data = Object.entries(snapshot.val()).map(([key]) => {
          const cardsValues = cards[key];
          return {
            id: key,
            ...cardsValues,
          };
        });
        onSetDataCards(data);
      }
    });
  },

  createCard: async (name: string, cardFields: DataField[]) => {
    const cardRef = await push(ref(db, 'cards/'), {
      name,
      cardFields,
    });
    const cardId = cardRef.key;
    return cardId;
  },

  updateCardById: async (card: DataCard) => {
    await update(ref(db, `cards/${card.id}`), {
      name: card.name,
      cardFields: card.cardFields,
    });
  },

  deleteCardById: async (cardId: string) => {
    const cardRef = ref(db, `cards/${cardId}`);
    await remove(cardRef);
  },
};

export { firebaseService };
