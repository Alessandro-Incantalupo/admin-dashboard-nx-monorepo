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
import { getNextResetMs } from '@app-info';
import { getHttpErrorMessage } from '@core/utils/http-error-message.util';
import { UsersService } from '@features/users/services/user.service';
import { toast } from 'ngx-sonner';
import { PaginatorState } from 'primeng/paginator';
import { debounceTime, pipe, switchMap, tap } from 'rxjs';
import { withPagination } from './features/withPagination';
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
  clonedUsers: { [id: string]: User };
};

const initialState: State = {
  users: [],
  clonedUsers: {},
};

export const UsersStore = signalStore(
  withState(initialState),
  withPagination({ initialPage: 1, initialPageSize: 5 }),
  withDevtools('Users Store'),
  withComputed(({ users }) => ({
    hasUsers: computed(() => users().length > 0),
  })),
  withMethods((state, userService = inject(UsersService)) => {
    const loadUsers = rxMethod<PaginatorState | void>(
      pipe(
        tap(() => {
          updateState(state, 'Users: Loading');
          setUsersLoading();
        }),
        debounceTime(300),
        switchMap(({ page = 1, rows = 5 }: Partial<PaginatorState> = {}) => {
          return userService.getUsers(page, rows).pipe(
            tapResponse({
              next: response => {
                updateState(state, 'Users: Load Success', {
                  users: response.data,
                  currentPage: page,
                  pageSize: rows,
                  totalItems: response.meta.totalItems,
                });

                setUsersLoaded();
              },
              error: err => {
                const message = getHttpErrorMessage(
                  err,
                  'Failed to load users'
                );
                toast.error(message);
                updateState(state, 'Users: Load Error');
                setUsersError(message);
              },
            })
          );
        })
      )
    );

    const addUser = rxMethod<User>(
      pipe(
        tap(() => setUsersAddLoading()),
        debounceTime(300),
        switchMap(newUser =>
          userService.addUser(newUser).pipe(
            tapResponse({
              next: user => {
                updateState(state, 'Users: Add', {
                  users: [user, ...state.users()],
                });
                setUsersAddLoaded();
                toast.success('User created!', {
                  description: 'The user has been added to the system.',
                  duration: 4000,
                  position: 'top-right',
                });
              },
              error: err => {
                const message = getHttpErrorMessage(err, 'Failed to add user');
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
                const message = getHttpErrorMessage(
                  err,
                  'Failed to update user'
                );

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
                const { currentPage, pageSize } = state;
                loadUsers({ page: currentPage(), rows: pageSize() });
              },
              error: err => {
                const message = getHttpErrorMessage(
                  err,
                  'Failed to delete user'
                );
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
        debounceTime(500),

        switchMap(() =>
          userService.resetDemoData().pipe(
            tapResponse({
              next: () => {
                loadUsers();
                setUsersResetLoaded();
              },
              error: err => {
                const message = getHttpErrorMessage(
                  err,
                  'Failed to reset demo data'
                );
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

    const startEditing = (user: User) => {
      updateState(state, 'User: Start Editing', {
        clonedUsers: {
          ...state.clonedUsers(),
          [user.id]: structuredClone(user),
        },
      });
    };

    const cancelEditing = (user: User) => {
      const cloned = { ...state.clonedUsers() };
      delete cloned[user.id];
      updateState(state, 'User: Cancel Editing', { clonedUsers: cloned });
    };
    const restoreUser = (user: User) => {
      const original = state.clonedUsers()[user.id];
      if (!original) return;

      const updatedUsers = state
        .users()
        .map(u => (u.id === user.id ? structuredClone(original) : u));

      updateState(state, 'Users: Restore Original', {
        users: updatedUsers,
        clonedUsers: Object.fromEntries(
          Object.entries(state.clonedUsers()).filter(([id]) => id !== user.id)
        ),
      });
    };

    return {
      loadUsers,
      reset,
      addUser,
      updateUser,
      deleteUser,
      resetDemoData,
      startEditing,
      cancelEditing,
      restoreUser,
    };
  }),

  withHooks(({ loadUsers }) => ({
    onInit: () => {
      loadUsers();
    },
  })),
  withCallState({ collection: 'users' })
);
