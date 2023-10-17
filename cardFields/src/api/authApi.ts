import { firebaseService } from '../service/firebaseService';

export type User = {
  email: string;
  password: string;
};

const authApi = {
  signIn: async (user: User) => {
    return await firebaseService.signIn(user.email, user.password);
  },
  createCard: async (id: string, name: string) => {
    return await firebaseService.createCard(id, name);
  },
};

export { authApi };
