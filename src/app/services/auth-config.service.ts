import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthConfigService {

  constructor() { }

  private bearerToken: string = '';
  private isAuthenticated: boolean = false;

  setToken(token: string): void {
    this.bearerToken = token;
  }
  getToken(): string {
    return this.bearerToken;
  }
  setAuthenticated(authenticated: boolean): void {
    this.isAuthenticated = authenticated;
  }
  getAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
