import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

    canActivate() {
        if (this.loginService.IsLogged()) {
            console.log('true');
            return true;
        } else {
            this.router.navigate(['login']);
            console.log('false');
            return false;
        }
    }
}
