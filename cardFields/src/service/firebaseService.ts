import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { remove, getDatabase, onValue, push, ref, set, update, get } from 'firebase/database';
import { OnLoadData } from '../pages/MainPage/MainPage';
import { DataCard, DataField } from '../providers/AppProvider';

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
          data = Object.entries(cards).map(([key]) => {
            let cardFields = [];
            const cardsValues = cards[key];
            Object.keys(cardsValues).map((key) => {
              if (key === 'cardFields') {
                cardFields = Object.entries(cardsValues['cardFields']).map(([key]) => {
                  const cardFieldValues = cardsValues['cardFields'][key];
                  return {
                    id: key,
                    ...cardFieldValues,
                  };
                });
              }
            });

            return {
              ...cardsValues,
              id: key,
              cardFields: cardFields,
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
      const cardKey = createdCard.key;

      set(createdCard, { name: name });

      cardFields.map((cardField) => {
        const customFieldRef = ref(db, `${currentUser}/cards/${cardKey}/cardFields`);
        const cardFieldRef = push(customFieldRef);
        set(cardFieldRef, { name: cardField.name, value: cardField.value });
      });
    } catch (err) {
      console.error('error:', err);
    }

    return createdCard.key;
  },

  updateCardById: async (card: DataCard) => {
    const currentUser = auth.currentUser?.uid;
    const cardFieldsRef = ref(db, `${currentUser}/cards/${card.id}/cardFields`);
    const cardFieldsSnapshot = await get(cardFieldsRef);
    const cardFields = cardFieldsSnapshot.exists() ? cardFieldsSnapshot.val() : {};

    Object.keys(cardFields).forEach(async (fbCardFieldKey) => {
      if (!card.cardFields.some((cardField) => cardField.id === fbCardFieldKey)) {
        const fbCardField = ref(db, `${currentUser}/cards/${card.id}/cardFields/${fbCardFieldKey}`);
        await remove(fbCardField);
      }
    });

    for (const cardField of card.cardFields) {
      if (cardField.id && Object.keys(cardFields).includes(cardField.id)) {
        const fbCardField = ref(db, `${currentUser}/cards/${card.id}/cardFields/${cardField.id}`);
        await update(fbCardField, { name: cardField.name, value: cardField.value });
      } else {
        await push(cardFieldsRef, { name: cardField.name, value: cardField.value });
      }
    }

    await update(ref(db, `${currentUser}/cards/${card.id}`), {
      name: card.name,
    });
  },

  deleteCardById: async (cardId: string) => {
    const currentUser = auth.currentUser?.uid;
    const cardRef = ref(db, `${currentUser}/cards/${cardId}`);
    await remove(cardRef);
  },
};

export { firebaseService };
