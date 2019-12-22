import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  error:string;
  users:any;
  show=false;
  constructor(private auth:AuthService,private router :Router) { }

  ngOnInit() {
  }
 getUsers(){
   this.show=true;
  this.auth.getUsers()
  .subscribe(
    result =>{ 
     this.users=result;
     console.log(result)
     console.log(this.users)
    
    },
    err => this.error = 'Could not authenticate'
  );
 }


}
