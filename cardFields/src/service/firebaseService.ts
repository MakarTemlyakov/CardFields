import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

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
const db = getDatabase(app);

const firebaseService = {
  signUp: async (email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
  },
  signIn: async (email: string, password: string) => {
    let response: UserResponse = { user: null, error: null };

    try {
      const responseData = await signInWithEmailAndPassword(auth, email, password);
      const userData = await responseData.user;
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

  createCard: async (cardId: string, name: string) => {
    const db = getDatabase();
    await set(ref(db, 'cards/' + cardId), {
      name,
    });
  },
};

export { firebaseService };
