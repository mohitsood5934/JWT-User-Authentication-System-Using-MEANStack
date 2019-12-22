import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  //loggin in for login component 
  login(email: string, password: string){
    return this.http.post<{token: string}>('http://localhost:7070/signin', {email:email, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          console.log('access_token');
        
         return result;
        })
      );
  }
  //signup for the signup component 
  signup(email: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>('http://localhost:7070/signup', {email:email, password: password})
      .pipe(
        map(result => {
          console.log("User created successfully");
          return true;
        })
      );
  }
  //getting the users for the users component 
  getUsers(){
    return this.http.get<{token: string}>('http://localhost:7070/users')
      .pipe(
        map(result => {
          console.log("Accessing Users ");
          return result
        })
      );

  }
 
  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
