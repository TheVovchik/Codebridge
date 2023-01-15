/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTopic } from '../api/api';
import { Topic } from '../types/Topic';

type TopicState = {
  topic: Topic | null;
  loading: boolean;
  error: string;
};

const initialState: TopicState = {
  topic: null,
  loading: false,
  error: '',
};

export const initOne = createAsyncThunk('topic/fetch', (id: number) => {
  return getTopic(id);
});

const TopicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initOne.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(initOne.fulfilled, (state, action) => {
      state.topic = action.payload;
      state.loading = false;
    });

    builder.addCase(initOne.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default TopicSlice.reducer;
