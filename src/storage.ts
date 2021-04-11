import { getStore, RootState } from './store/store';
import localforage from 'localforage';

localforage.config();

export async function readState(): Promise<RootState | undefined> {
  const state = await localforage.getItem<string | null>('state');
  return state === null ? undefined : JSON.parse(state);
}

export async function writeState(): Promise<void> {
  const store = await getStore();
  const state = JSON.stringify(store.getState());
  await localforage.setItem('state', state);
}
