import { create } from 'zustand'


export const useStore = create((set) => ({
  user_email: '',
  setUserEmail: (email) => set({ user_email: email }),
}));

