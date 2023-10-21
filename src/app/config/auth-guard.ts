import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthConfigService } from "../services/auth-config.service";
@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private authConfigService: AuthConfigService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (this.authConfigService.getAuthenticated()) {
            return true;
        }
        return this.router.parseUrl('/login');
    }
}
export const canActivateTeam: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthGuard).canActivate(route, state);
}