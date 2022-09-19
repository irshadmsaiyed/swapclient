import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subjects: [],
};

export const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setSubjects: (state, actions) => {
      // eslint-disable-next-line no-param-reassign
      state.subjects = [...actions.payload];
    },
  },
});

export const { setSubjects } = subjectSlice.actions;
export default subjectSlice.reducer;
