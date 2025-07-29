import { UserRoleType } from '@admin-dashboard-nx-monorepo/models';
import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { environment } from '../../../environments/environment';

export interface UserProfile {
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
  token: string;
  roles: UserRoleType[];
}

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  _keycloak: Keycloak | undefined;
  profile: UserProfile | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      });
    }
    return this._keycloak;
  }

  async init() {
    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html',
    });

    if (!authenticated) return false;
    const userInfo = await this.keycloak.loadUserInfo();
    const token = this.keycloak.token || '';
    // Extract roles from tokenParsed
    const tokenParsed = this.keycloak.tokenParsed as any;
    const roles: string[] =
      tokenParsed?.realm_access?.roles ??
      tokenParsed?.resource_access?.[environment.keycloak.clientId]?.roles ??
      [];
    this.profile = {
      ...(userInfo as any),
      token,
      roles,
    };
    return true;
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    return this.keycloak.logout({ redirectUri: window.location.origin });
  }
}
