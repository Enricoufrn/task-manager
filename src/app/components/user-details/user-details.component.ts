import { Component } from '@angular/core';
import { UserModel } from 'src/app/domain/UserModel';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { getUserRole } from 'src/app/utils/users-utils';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  user: UserModel | null;
  constructor(private userDetailsService: UserDetailsService) {
    const loggedUser = this.userDetailsService.loggedUser;
    if (loggedUser != null) {
      loggedUser.role = getUserRole(loggedUser.role);
    }
    this.user = loggedUser;
  }
}
