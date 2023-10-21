import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/domain/UserModel';
import { ApiRoutesService } from 'src/app/services/api-routes.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  constructor(private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private config: ApiRoutesService) { }

  registerUserForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('ROLE_COMMON', Validators.required)
  });

  onSubmit() {
    if (this.registerUserForm.valid) {
      console.debug('RegisterUserComponent -> onSubmit: ', this.registerUserForm.value);
      const config = this.config.getConfig();
      const registerUserRoute = `${config?.protocol}://${config?.host}${config?.baseUrl}${config?.userRoute}`;
      this.httpClient.post<UserModel>(registerUserRoute, this.registerUserForm.value, { observe: 'response' })
        .subscribe((response: HttpResponse<UserModel>) => {
          console.debug('RegisterUserComponent -> onSubmit: response: ', response);
          if (response.status == 201) {
            alert('User registered successfully!');
            this.router.navigate(['/login']);
          } else {
            alert('Error registering user!');
          }
        });
    }
  }
}
