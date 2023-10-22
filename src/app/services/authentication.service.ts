import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../domain/UserModel';
import { ApiRoutesService } from './api-routes.service';
import { LoginRequestDTO } from '../domain/LoginRequestDTO';
import { Observable, catchError, map, of } from 'rxjs';
import { UserDetailsService } from './user-details.service';
import { AuthConfigService } from './auth-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,
    private configService: ApiRoutesService,
    private userDetailsService: UserDetailsService,
    private authConfigService: AuthConfigService) { }

  login(loginRequest: LoginRequestDTO): Observable<boolean> {
    console.debug('AuthenticationService -> login: loginRequest: ', loginRequest);
    const config = this.configService.getConfig();
    const loginRoute = `${config?.protocol}://${config?.host}${config?.baseUrl}${config?.authRoute}`;
    return this.httpClient.post<UserModel>(loginRoute, loginRequest, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<UserModel>) => {
          console.debug('AuthenticationService -> login: response: ', response);
          if (response == null) {
            return false;
          } else if (response.status == 200) {
            console.debug('AuthenticationService -> login: response.headers: ', response.headers.get('Authorization'));
            const token = response.headers.get('Authorization');
            if (token?.startsWith('Bearer ')) {
              this.authConfigService.setToken(token.split(' ')[1]);
              this.authConfigService.setAuthenticated(true);
              this.userDetailsService.setLoggedUser(response.body as UserModel);
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.debug('Login error:', error);
          return of(false);
        })
      );
  }

  logout(): void {
    this.authConfigService.setToken('');
    this.authConfigService.setAuthenticated(false);
    this.userDetailsService.setLoggedUser(null);
  }
}
