import { User, UserRole } from '@admin-dashboard-nx-monorepo/models';
import { isPlatformServer } from '@angular/common';
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { KeycloakService } from '@core/services/keycloak.service';

const ANONYMOUS_USER: User = {
  id: '',
  email: 'nomail',
  name: 'no user',
  role: [UserRole.guest],
  status: 'active',
};

@Injectable({ providedIn: 'root' })
export class SecurityStore {
  #keycloakService = inject(KeycloakService);

  readonly loaded = signal(false);
  readonly user = signal<User>(ANONYMOUS_USER);
  readonly token = signal<string>('');

  readonly loadedUser = computed(() =>
    this.loaded() ? this.user() : undefined
  );
  readonly signedIn = computed(
    () => this.loaded() && !this.user().role.includes('guest')
  );

  readonly isGuest = computed(() => this.user().role.includes('guest'));
  readonly isUser = computed(() => this.user().role.includes('user'));
  readonly isAdmin = computed(() => this.user().role.includes('admin'));

  readonly canEdit = computed(
    () => this.isUser() || (this.isAdmin() && this.signedIn())
  );
  readonly canDelete = computed(() => this.isAdmin());
  readonly canCreate = computed(() => this.isAdmin());

  constructor() {
    this.onInit();
  }

  async onInit() {
    const isServer = isPlatformServer(inject(PLATFORM_ID));
    if (isServer) {
      this.user.set(ANONYMOUS_USER);
      this.token.set('');
      this.loaded.set(true);
      return;
    }

    const isLoggedIn = await this.#keycloakService.init();
    if (isLoggedIn && this.#keycloakService.profile) {
      const { sub, email, given_name, family_name, token, roles } =
        this.#keycloakService.profile;
      this.user.set({
        id: sub,
        email,
        name: `${given_name} ${family_name}`,
        role: roles,
        status: 'active',
      });
      this.token.set(token);
    } else {
      this.user.set(ANONYMOUS_USER);
      this.token.set('');
    }
    this.loaded.set(true);
  }

  async signIn() {
    await this.#keycloakService.login();
  }

  async signOut() {
    await this.#keycloakService.logout();
  }
}
