import { create } from "zustand";
import { Cat } from "../features/Cats/types";

interface AppState {
  catsData: Cat[];
  setCatData: (catsData: Cat[]) => void;
}

const initialState = [
  {
    breeds: [{ id: "", description: "", name: "", wikipedia_url: "" }],
    id: "",
    url: "",
  },
];

export const useAppStore = create<AppState>((set) => ({
  catsData: initialState,
  setCatData: (catsData: Cat[]) => set({ catsData }),
}));
