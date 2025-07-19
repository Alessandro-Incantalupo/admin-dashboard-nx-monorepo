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
  updateState,
  withCallState,
  withDevtools,
} from '@angular-architects/ngrx-toolkit';

import { User } from '@admin-dashboard-nx-monorepo/models';
import { HttpErrorResponse } from '@angular/common/http';
import { getNextResetMs } from '@app-info';
import { UsersService } from '@features/users/services/user.service';
import { toast } from 'ngx-sonner';
import { debounceTime, pipe, switchMap, tap } from 'rxjs';
import {
  setUsersAddError,
  setUsersAddLoaded,
  setUsersAddLoading,
  setUsersDeleteError,
  setUsersDeleteLoaded,
  setUsersDeleteLoading,
  setUsersError,
  setUsersLoaded,
  setUsersLoading,
  setUsersResetError,
  setUsersResetLoaded,
  setUsersResetLoading,
  setUsersUpdateError,
  setUsersUpdateLoaded,
  setUsersUpdateLoading,
} from './features/withUserCallState';

type State = {
  users: User[];
};

const initialState: State = {
  users: [],
};

export const UsersStore = signalStore(
  withState(initialState),
  withDevtools('Users Store'),
  withComputed(({ users }) => ({
    hasUsers: computed(() => users().length > 0),
  })),
  withMethods((state, userService = inject(UsersService)) => {
    const loadUsers = rxMethod<void>(
      pipe(
        tap(() => setUsersLoading()),
        debounceTime(500),
        switchMap(() =>
          userService.getUsers().pipe(
            tapResponse({
              next: users => {
                updateState(state, 'Users: Load Success', { users });
                setUsersLoaded();
              },
              error: err => {
                const message =
                  err instanceof HttpErrorResponse && err.status === 429
                    ? 'Too many requests. Please wait and try again.'
                    : err instanceof Error
                      ? err.message
                      : 'Failed to load users';

                toast.error(message);
                setUsersError(message);
              },
            })
          )
        )
      )
    );

    const addUser = rxMethod<User>(
      pipe(
        tap(() => setUsersAddLoading()),
        debounceTime(500),
        switchMap(newUser =>
          userService.addUser(newUser).pipe(
            tapResponse({
              next: user => {
                updateState(state, 'Users: Add', {
                  users: [...state.users(), user],
                });
                setUsersAddLoaded();
                toast.success('User created!', {
                  description: 'The user has been added to the system.',
                  duration: 4000,
                  position: 'top-right',
                });
              },
              error: err => {
                const message =
                  err instanceof HttpErrorResponse && err.status === 429
                    ? 'Too many requests. Please wait and try again.'
                    : err instanceof Error
                      ? err.message
                      : 'Failed to add user';

                toast.error(message);
                setUsersAddError(message);
              },
            })
          )
        )
      )
    );

    const updateUser = rxMethod<User>(
      pipe(
        tap(() => setUsersUpdateLoading()),
        debounceTime(500),
        switchMap(updatedUser =>
          userService.updateUser(updatedUser).pipe(
            tapResponse({
              next: user => {
                updateState(state, 'Users: Update', {
                  users: state.users().map(u => (u.id === user.id ? user : u)),
                });
                setUsersUpdateLoaded();
                toast.success('User updated!', {
                  description: `User "${user.name}" has been updated.`,
                  duration: 4000,
                  position: 'top-right',
                });
              },
              error: err => {
                const message =
                  err instanceof HttpErrorResponse && err.status === 429
                    ? 'Too many requests. Please wait and try again.'
                    : err instanceof Error
                      ? err.message
                      : 'Failed to update user';

                toast.error(message);
                setUsersUpdateError(message);
              },
            })
          )
        )
      )
    );

    const deleteUser = rxMethod<string>(
      pipe(
        tap(() => setUsersDeleteLoading()),
        debounceTime(500),
        switchMap(userId => {
          const user = state.users().find(u => u.id === userId);
          return userService.deleteUser(userId).pipe(
            tapResponse({
              next: () => {
                updateState(state, 'Users: Delete', {
                  users: state.users().filter(u => u.id !== userId),
                });
                toast.success('User deleted!', {
                  description: `User "${user?.name ?? userId}" has been removed from the system.`,
                  duration: 4000,
                  position: 'top-right',
                });
                setUsersDeleteLoaded();
              },
              error: err => {
                const message =
                  err instanceof HttpErrorResponse && err.status === 429
                    ? 'Too many requests. Please wait and try again.'
                    : err instanceof Error
                      ? err.message
                      : 'Failed to delete user';

                toast.error(message);
                setUsersDeleteError(message);
              },
            })
          );
        })
      )
    );

    const resetDemoData = rxMethod<void>(
      pipe(
        tap(() => {
          setUsersResetLoading();
        }),
        switchMap(() =>
          userService.resetDemoData().pipe(
            tapResponse({
              next: () => {
                loadUsers();
                setUsersResetLoaded();
              },
              error: err => {
                const message =
                  err instanceof HttpErrorResponse && err.status === 429
                    ? 'Too many requests. Please wait and try again.'
                    : err instanceof Error
                      ? err.message
                      : 'Failed to reset demo data';

                toast.error(message);
                setUsersResetError(message);
              },
            })
          )
        )
      )
    );

    const intervalMs = 1000 * 60 * 60;
    setTimeout(() => {
      loadUsers();
      setInterval(() => loadUsers(), intervalMs);
    }, getNextResetMs());
    const reset = () => updateState(state, 'Users: Reset', initialState);

    return { loadUsers, reset, addUser, updateUser, deleteUser, resetDemoData };
  }),
  withHooks(({ loadUsers }) => ({
    onInit: () => {
      loadUsers();
    },
  })),
  withCallState({ collection: 'users' })
);
