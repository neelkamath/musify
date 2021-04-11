import { configureStore, Store } from '@reduxjs/toolkit';
import { PlaylistsSlice } from './PlaylistsSlice';
import { readState } from '../storage';

let store: Store | undefined;

export async function getStore(): Promise<Store> {
  if (store === undefined)
    store = configureStore({
      preloadedState: await readState(),
      reducer: { playlists: PlaylistsSlice.reducer },
    });
  return store;
}

// @ts-ignore: TS2532: Object is possibly 'undefined'.
export type RootState = ReturnType<typeof store.getState>;
