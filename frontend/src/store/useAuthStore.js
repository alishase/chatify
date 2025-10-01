import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "test", email: "test", image: "test", id: "test" },
  isLoggedIn: false,

  login: () => {
    console.log("login");
    set({ isLoggedIn: true });
  },
}));
