import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthConfigService } from "../services/auth-config.service";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor(private authConfigService: AuthConfigService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authConfigService.getAuthenticated()) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.authConfigService.getToken())
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }

}