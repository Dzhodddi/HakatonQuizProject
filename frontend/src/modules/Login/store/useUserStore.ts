import { UserType } from 'src/types/user';
import { create } from 'zustand'

interface UserState {
  user: UserType;
    setUser: (user: UserType) => void;
}

export const useUserStore = create<UserState>()((set) => ({
    user: {
        id: "0",
        first_name: "",
        second_name: "",
        email: "",
    },
    setUser: (user) => set({ user }),
}));