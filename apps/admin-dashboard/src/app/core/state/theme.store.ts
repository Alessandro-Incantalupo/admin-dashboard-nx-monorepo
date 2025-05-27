import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

type State = {
  mode: 'light' | 'dark';
  color: string;
};

const initialState: State = {
  mode: 'dark',
  color: 'base',
};

const themeColors = [
  { name: 'base', code: '#e11d48' },
  { name: 'yellow', code: '#f59e0b' },
  { name: 'green', code: '#22c55e' },
  { name: 'blue', code: '#3b82f6' },
  { name: 'orange', code: '#ea580c' },
  { name: 'red', code: '#cc0022' },
  { name: 'violet', code: '#6d28d9' },
];

export const ThemeStore = signalStore(
  withState<State>(initialState),
  withComputed(state => ({
    isDark: computed(() => state.mode() === 'dark'),
  })),
  withMethods(state => {
    const loadTheme = () => {
      try {
        const saved = localStorage.getItem('theme');
        if (saved) {
          const parsed: State = JSON.parse(saved);
          patchState(state, parsed); // Use patchState to merge the parsed theme
          applyToDOM(parsed);
        } else {
          applyToDOM({ mode: state.mode(), color: state.color() });
        }
      } catch (error) {
        console.error('Failed to load theme from localStorage:', error);
        applyToDOM({ mode: state.mode(), color: state.color() });
      }
    };

    const setTheme = (theme: Partial<State>) => {
      patchState(state, theme); // Use patchState to update the theme
      try {
        localStorage.setItem(
          'theme',
          JSON.stringify({ mode: state.mode(), color: state.color() })
        );
      } catch (error) {
        console.error('Failed to save theme to localStorage:', error);
      }
      applyToDOM({ mode: state.mode(), color: state.color() });
    };

    const toggleMode = () => {
      patchState(state, { mode: state.mode() === 'dark' ? 'light' : 'dark' });
      applyToDOM({ mode: state.mode(), color: state.color() });
    };

    const setColor = (color: string) => {
      patchState(state, { color });
      applyToDOM({ mode: state.mode(), color: state.color() });
    };

    const applyToDOM = (theme: State) => {
      const html = document.querySelector('html');
      if (html) {
        html.className = theme.mode;
        html.setAttribute('data-theme', theme.color);
      } else {
        console.warn('Failed to apply theme to DOM: <html> element not found.');
      }
    };

    const getThemeColors = () => themeColors;
    const getMode = () => ['light', 'dark'];

    return {
      loadTheme,
      setTheme,
      toggleMode,
      setColor,
      getThemeColors,
      getMode,
    };
  }),
  withHooks(store => ({
    onInit: () => {
      store.loadTheme();
    },
  }))
);
