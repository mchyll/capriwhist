import { Action, combineReducers, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import undoable from 'redux-undo';
import counterReducer from '../features/counter/counterSlice';
import gameReducer from '../game/GameSlice';

export const persistKey = "capriwhist_root";

const persistedReducer = persistReducer(
  {
    key: persistKey,
    storage
  },
  combineReducers({
    counter: counterReducer,
    game: undoable(gameReducer, {
      limit: 8,
    })
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
