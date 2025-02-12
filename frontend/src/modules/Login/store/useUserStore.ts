import { UserType } from 'src/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: UserType;
  setUser: (user: UserType) => void;
  password: string;
  setPassword: (password: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        id: "0",
        first_name: "",
        second_name: "",
        email: "",
      },
      setUser: (user) => set({ user }),
      password: "",
      setPassword: (password) => set({ password }),
    }),
    {
      name: 'user-storage',
    }
  )
);