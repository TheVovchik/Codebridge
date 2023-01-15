/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTopics } from '../api/api';
import { SortedTopic, Topic } from '../types/Topic';
import { sliceSummary } from '../Utils/sliceSummary';
import { sliceTopic } from '../Utils/sliceTopic';

type TopicsState = {
  topics: Topic[];
  topicsWithQuery: SortedTopic[];
  quantity: number;
  query: string[];
  initialQuery: string;
  loading: boolean;
  error: string;
};

const initialState: TopicsState = {
  topics: [],
  topicsWithQuery: [],
  quantity: 0,
  query: [],
  initialQuery: '',
  loading: false,
  error: '',
};

export const initAll = createAsyncThunk('topics/fetch', () => {
  return getTopics();
});

const TopicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.initialQuery = action.payload;
      state.query = action.payload.toLowerCase().split(' ');
    },
    addMatches: (state, action: PayloadAction<SortedTopic>) => {
      state.topicsWithQuery = state.topicsWithQuery.map(topic => {
        if (topic.id !== action.payload.id) {
          return topic;
        }

        return action.payload;
      });
    },
    changeQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
    countMatches: (state) => {
      state.topicsWithQuery = state.topicsWithQuery.map(topic => {
        const topicTitle = sliceTopic(topic.title).split(' ');
        const description = sliceSummary(topic.summary).split(' ');

        const countTitles = topicTitle
          .reduce((acc, curr) => {
            return state.query
              .includes(curr.toLowerCase().replace(/[.,]/g, '').trim())
              ? acc + 1
              : acc;
          }, 0);

        const countDescr = description
          .reduce((acc, curr) => {
            return state.query
              .includes(curr.toLowerCase().replace(/[.,]/g, '').trim())
              ? acc + 1
              : acc;
          }, 0);

        return {
          ...topic,
          titleQueryMatches: countTitles,
          summaryQueryMatches: countDescr,
        };
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initAll.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(initAll.fulfilled, (state, action) => {
      state.topics = action.payload;
      state.topicsWithQuery = action.payload
        .map(topic => {
          return {
            ...topic,
            titleQueryMatches: 0,
            summaryQueryMatches: 0,
          };
        });
      state.quantity = action.payload.length;
      state.loading = false;
    });

    builder.addCase(initAll.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default TopicsSlice.reducer;
export const { actions } = TopicsSlice;
