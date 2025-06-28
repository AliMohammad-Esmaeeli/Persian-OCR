import { create } from 'zustand';

interface TextState {
  text: string;
  summary: string;
  translation: string;
  setText: (text: string) => void;
  setSummary: (summary: string) => void;
  setTranslation: (translation: string) => void;
  reset: () => void;
}

const useTextStore = create<TextState>((set) => ({
  text: '',
  summary: '',
  translation: '',

  // Actions
  setText: (text) => set({ text }),
  setSummary: (summary) => set({ summary }),
  setTranslation: (translation) => set({ translation }),

  // Reset all fields
  reset: () => set({ 
    text: '', 
    summary: '', 
    translation: '', 
  }),
}));

export default useTextStore;