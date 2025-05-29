import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import {
  CallState,
  updateState,
  withDevtools,
} from '@angular-architects/ngrx-toolkit';

import { UsersService } from '@features/users/services/user.service';
import { pipe, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';
import {
  setUsersError,
  setUsersLoaded,
  setUsersLoading,
  withUsersCallState,
} from './features/withUserCallState';

type State = {
  users: User[];
  error: string | null;
  usersCallState: CallState;
};

const initialState: State = {
  users: [],
  error: null,
  usersCallState: 'init',
};

export const UsersStore = signalStore(
  withState(initialState),
  withDevtools('Users Store'),
  withComputed(({ users, error }) => ({
    hasUsers: computed(() => users().length > 0),
    hasError: computed(() => !!error()),
  })),
  withMethods((state, userService = inject(UsersService)) => {
    const loadUsers = rxMethod<void>(
      pipe(
        tap(() => updateState(state, 'Users: Loading', setUsersLoading())),
        switchMap(() =>
          userService.getUsers().pipe(
            tapResponse({
              next: users =>
                updateState(
                  state,
                  'Users: Load Success',
                  { users },
                  setUsersLoaded()
                ),
              error: () =>
                updateState(
                  state,
                  'Users: Load Error',
                  setUsersError('Failed to load users')
                ),
            })
          )
        )
      )
    );

    const addUser = rxMethod<User>(
      pipe(
        switchMap(newUser =>
          userService.addUser(newUser).pipe(
            tapResponse({
              next: user =>
                updateState(state, 'Users: Add', {
                  users: [...state.users(), user],
                }),
              error: () =>
                updateState(state, 'Users: Add Error', {
                  error: 'Failed to add user',
                }),
            })
          )
        )
      )
    );

    const updateUser = rxMethod<User>(
      pipe(
        switchMap(updatedUser =>
          userService.updateUser(updatedUser).pipe(
            tapResponse({
              next: user =>
                updateState(state, 'Users: Update', {
                  users: state.users().map(u => (u.id === user.id ? user : u)),
                }),
              error: () =>
                updateState(state, 'Users: Update Error', {
                  error: 'Failed to update user',
                }),
            })
          )
        )
      )
    );

    const deleteUser = rxMethod<string>(
      pipe(
        switchMap(userId =>
          userService.deleteUser(userId).pipe(
            tapResponse({
              next: () =>
                updateState(state, 'Users: Delete', {
                  users: state.users().filter(u => u.id !== userId),
                }),
              error: () =>
                updateState(state, 'Users: Delete Error', {
                  error: 'Failed to delete user',
                }),
            })
          )
        )
      )
    );

    const reset = () => updateState(state, 'Users: Reset', initialState);

    return { loadUsers, reset, addUser, updateUser, deleteUser };
  }),
  withHooks(({ loadUsers }) => ({
    onInit: () => {
      loadUsers();
    },
  })),
  withUsersCallState()
);
