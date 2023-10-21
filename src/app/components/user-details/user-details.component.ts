import { Component } from '@angular/core';
import { UserModel } from 'src/app/domain/UserModel';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  user: UserModel | null;
  constructor(private userDetailsService: UserDetailsService) {
    this.user = this.userDetailsService.loggedUser;
  }
}
