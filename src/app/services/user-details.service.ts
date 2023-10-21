import { Injectable } from '@angular/core';
import { UserModel } from '../domain/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  loggedUser: UserModel | null = null;

  constructor() { }

  setLoggedUser(user: UserModel | null) {
    console.debug('UserDetailsService -> setLoggedUser: user: ', user);
    this.loggedUser = user;
  }
}
