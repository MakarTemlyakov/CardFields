import { firebaseService } from '../service/firebaseService';

export type User = {
  email: string;
  password: string;
};

const authApi = {
  signIn: async (user: User) => {
    return await firebaseService.signIn(user.email, user.password);
  },
};

export { authApi };
