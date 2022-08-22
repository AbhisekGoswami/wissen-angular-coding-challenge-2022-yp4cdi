import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Modify the login component and the login template to collect login details and add the validators as necessary
 */
import { AuthenticationService } from '../services/authentication.service';

@Component({
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // setup the loginform and validators
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  token: '';
  ngOnDestroy() {}

  onSubmit() {
    //
    var val1 = this.usernameValidator();
    var val2 = this.passwordValidator();

    if (true && val2) {
      this.authenticationService
        .login(
          this.loginForm.get('UserName').value,
          this.loginForm.get('Password').value
        )
        .subscribe(
          (res) => (this.token = res),
          (err) => console.log(err)
        );
      this.authenticationService.getUserList(this.token).subscribe(
        (res) => {
          res.data.forEach((e) => console.log(e.name));
        },
        (err) => console.log(err)
      );
    } else {
      alert('Invalid username /password');
    }
  }

  // implement the username validator. Min 6 characters and no digits, special chars
  usernameValidator() {
    var isValid = false;
    var val = this.loginForm.get('UserName').value;
    var data1 = /^[A-Za-z]+$/;
    var data2 = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var res1 = true;
    var res2 = true;

    if (val.length < 6 || !val.match(data1)) {
      res1 = false;
    }
    if (val.length < 6 || !val.match(data2)) {
      res2 = false;
    }
    if (res1 == true || res2 == true) {
      isValid = true;
    }

    return isValid;
  }

  // implement the password validator
  // Min 1 uppercase, 1 lower case and a digit. Total length >= 8
  passwordValidator() {
    var isValid = true;
    var val = this.loginForm.get('Password').value;
    var data = /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;
    if (!val.match(data) && val.length < 8) {
      isValid = false;
    }
    return isValid;
  }
}
