import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { UsersService } from '@features/users/services/user.service';
import { pipe, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';

type State = {
  users: User[];
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  users: [],
  loading: false,
  error: null,
};

export const UsersStore = signalStore(
  withState(initialState),
  withComputed(({ users, error }) => ({
    hasUsers: computed(() => users().length > 0),
    hasError: computed(() => !!error()),
  })),
  withMethods((state, userService = inject(UsersService)) => {
    const loadUsers = rxMethod<void>(
      pipe(
        tap(() => {
          patchState(state, { loading: true, error: null });
        }),
        switchMap(() =>
          userService.getUsers().pipe(
            tapResponse({
              next: users => patchState(state, { users, loading: false }),
              error: error => {
                patchState(state, {
                  loading: false,
                  error: 'Failed to load users',
                });
              },
            })
          )
        )
      )
    );

    const addUser = rxMethod<User>(
      pipe(
        tap(() => patchState(state, { loading: true })),
        switchMap(newUser =>
          userService.addUser(newUser).pipe(
            tapResponse({
              next: user =>
                patchState(state, {
                  users: [...state.users(), user],
                  loading: false,
                }),
              error: () =>
                patchState(state, {
                  error: 'Failed to add user',
                  loading: false,
                }),
            })
          )
        )
      )
    );
    const updateUser = rxMethod<User>(
      pipe(
        tap(() => patchState(state, { loading: true, error: null })),
        switchMap(updatedUser =>
          userService.updateUser(updatedUser).pipe(
            tapResponse({
              next: user =>
                patchState(state, {
                  users: state.users().map(u => (u.id === user.id ? user : u)),
                  loading: false,
                }),
              error: () =>
                patchState(state, {
                  error: 'Failed to update user',
                  loading: false,
                }),
            })
          )
        )
      )
    );
    const deleteUser = rxMethod<string>(
      pipe(
        tap(() => patchState(state, { loading: true, error: null })),
        switchMap(userId =>
          userService.deleteUser(userId).pipe(
            tapResponse({
              next: () =>
                patchState(state, {
                  users: state.users().filter(u => u.id !== userId),
                  loading: false,
                }),
              error: () =>
                patchState(state, {
                  error: 'Failed to delete user',
                  loading: false,
                }),
            })
          )
        )
      )
    );

    const reset = () => patchState(state, initialState);

    return { loadUsers, reset, addUser, updateUser, deleteUser };
  }),
  withHooks(({ loadUsers }) => ({
    onInit: () => {
      loadUsers();
    },
  }))
);
