import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import topic from '../features/topic';
import topics from '../features/topics';

export const store = configureStore({
  reducer: {
    topics,
    topic,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
