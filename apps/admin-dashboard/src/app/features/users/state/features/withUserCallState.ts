import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
} from '@angular-architects/ngrx-toolkit';
import { signalStoreFeature } from '@ngrx/signals';

export function withUsersCallState() {
  return signalStoreFeature(withCallState({ collection: 'users' }));
}

export function setUsersLoading() {
  return setLoading('users');
}
export function setUsersLoaded() {
  return setLoaded('users');
}
export function setUsersError(error: string) {
  return setError(error, 'users');
}
