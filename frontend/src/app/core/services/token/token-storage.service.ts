import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';

  constructor() {}

  public getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem(this.USER_KEY));
  }

  setUser(user): void {
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  getCurrentUserRole(): string {
    return sessionStorage.getItem("role");
  }

  getCurrentUserId(): string {
    return sessionStorage.getItem("id");
  }

  getCurrentUserUsername(): string {
    return sessionStorage.getItem("username");
  }

  getCurrentUserPermissions(): string[] {
    return JSON.parse(localStorage.getItem("permissions"));
  }
  getCurrentUserModulos(): string[] {
    return JSON.parse(localStorage.getItem("modulos"));
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  clearStorage(): void {
    sessionStorage.clear();
    window.sessionStorage.clear();
  }
  removeToken() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }
}
