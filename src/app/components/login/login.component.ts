import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestDTO } from 'src/app/domain/LoginRequestDTO';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  loginForm = this.formBuilder.group({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit() {
    const loginRequest = new LoginRequestDTO();
    loginRequest.login = this.loginForm.value.login;
    loginRequest.password = this.loginForm.value.password;
    this.authService.login(loginRequest).subscribe(result => {
      console.debug('LoginComponent -> Login result: ', result);
      if (result) {
        this.router.navigate(['home']);
      } else {
        console.debug('Login failed!');
      }
    });
  }
  registerUser() {
    this.router.navigate(['register-user']);
  }
}
