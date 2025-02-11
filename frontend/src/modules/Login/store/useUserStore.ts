import { UserType } from 'src/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: UserType;
  setUser: (user: UserType) => void;
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
    }),
    {
      name: 'user-storage',
    }
  )
);