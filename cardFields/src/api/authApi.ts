import { service } from '../service/firbaseStore';

export type User = {
  email: string;
  password: string;
};

const authApi = {
  signIn: async (user: User) => {
    return await service.signIn(user.email, user.password);
  },
};

export { authApi };
