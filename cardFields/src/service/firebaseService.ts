import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { remove, getDatabase, onValue, push, ref, set, update } from 'firebase/database';
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

const PROJECT_ID = 'customfields-1eb2e';
const FIRESTORE_API_KEY = 'AIzaSyCEwx0vsaCSie9aQcPlnf7sQW_EDeR4PDI';
const DB_URL = 'https://customfields-1eb2e-default-rtdb.firebaseio.com/';

const firebaseConfig: FirebaseOptions = {
  projectId: PROJECT_ID,
  apiKey: FIRESTORE_API_KEY,
  databaseURL: DB_URL,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getDatabase(app);

const firebaseService = {
  signUp: async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
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
      console.error(error);
    }
  },

  loginOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('error:', error);
    }
  },

  getCardById: async (cardId: string) => {
    try {
      const currentUser = auth.currentUser?.uid;
      const cardRef = ref(db, `${currentUser}/cards/` + cardId);
      onValue(cardRef, (snapshot) => {
        const data = snapshot.val();
      });
    } catch (error) {
      console.error('error:', error);
    }
  },

  getCards: async (onSetDataCards: OnLoadData) => {
    let data = [];

    try {
      const currentUser = auth.currentUser?.uid;
      const cardRef = ref(db, `${currentUser}/cards`);

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
        } else {
          data = [];
        }
        onSetDataCards(data);
      });
    } catch (error) {
      console.error('error', error);
    }
  },

  createCard: async (name: string, cardFields: DataField[]) => {
    let createdCard: any = null;

    try {
      const currentUser = auth.currentUser?.uid;
      const cardRef = ref(db, `${currentUser}/cards`);
      createdCard = push(cardRef);
      set(createdCard, { name, cardFields });
    } catch (err) {
      console.error('error:', err);
    }

    return createdCard.key;
  },

  updateCardById: async (card: DataCard) => {
    const currentUser = auth.currentUser?.uid;
    await update(ref(db, `${currentUser}/cards/${card.id}`), {
      name: card.name,
      cardFields: card.cardFields,
    });
  },

  deleteCardById: async (cardId: string) => {
    const currentUser = auth.currentUser?.uid;
    const cardRef = ref(db, `${currentUser}/cards/${cardId}`);
    await remove(cardRef);
  },
};

export { firebaseService };
