import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {

  public email: string;
  public password: string;
  public error: string;
  public success_message:string;
  public error_message:string;
  constructor(private auth: AuthService, private router: Router) { }

  public submit() {
    this.auth.signup(this.email, this.password)
      .pipe(first())
      .subscribe(
        result =>{
          this.success_message="User Created Successfully"
          this.email=null;
          this.password=null;
        } ,
        err => this.error_message = 'Could not create user'
      );
  }

}
