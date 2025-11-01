import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LanguageState = {
  language: 'en' | 'bn';
};

const LOCAL_KEY = 'lang';
const getInitialLanguage = (): 'en' | 'bn' => {
  if (typeof window !== 'undefined') {
    const stored = getLocalStorage(LOCAL_KEY);
    if (stored === 'bn' || stored === 'en') return stored;
  }
  return 'en';
};

const initialState: LanguageState = {
  language: getInitialLanguage(),
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'bn'>) => {
      state.language = action.payload;
      if (typeof window !== 'undefined') {
        setLocalStorage(LOCAL_KEY, action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
