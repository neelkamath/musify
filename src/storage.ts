import { getStore, RootState } from './store/store';
import localforage from 'localforage';

localforage.config();

export async function readState(): Promise<RootState | undefined> {
  const state = await localforage.getItem<string | null>(readLoggedInUsername()!);
  return state === null ? undefined : JSON.parse(state);
}

export async function writeState(): Promise<void> {
  const store = await getStore();
  const state = JSON.stringify(store.getState());
  await localforage.setItem(readLoggedInUsername()!, state);
}

interface Account {
  readonly username: string;
  readonly password: string;
}

interface Users {
  readonly accounts: Account[];
  /** A `string` with the value of the {@link Account.username} if a user is logged in, and `undefined` otherwise. */
  readonly loggedInUsername: string | undefined;
}

function readUsers(): Users {
  const item = localStorage.getItem('users');
  return item === null ? ({ accounts: [], loggedInUsername: undefined } as Users) : JSON.parse(item);
}

function overwriteUsers(accounts: Users): void {
  localStorage.setItem('users', JSON.stringify(accounts));
}

export function isExistingUsername(username: string): boolean {
  const { accounts } = readUsers();
  return accounts.find((account) => account.username === username) !== undefined;
}

export function createAccount(account: Account): void {
  const users = readUsers();
  overwriteUsers({ ...users, accounts: [...users.accounts, account] });
}

export function isValidLogin(account: Account): boolean {
  const { accounts } = readUsers();
  return (
    accounts.find(({ username, password }) => username === account.username && password === account.password) !==
    undefined
  );
}

/** A `string` with the value of the {@link Account.username} if a user is logged in, and `undefined` otherwise. */
export function setLoggedInUsername(username: string | undefined): void {
  const users = readUsers();
  overwriteUsers({ ...users, loggedInUsername: username });
}

/** A `string` with the value of the {@link Account.username} if a user is logged in, and `undefined` otherwise. */
export function readLoggedInUsername(): string | undefined {
  return readUsers().loggedInUsername;
}
