import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validMessage = '';
  subscription: Subscription;
  isLoggedIn: boolean;
 // loginValid: Observable<boolean> = this.userService.login(this.loginForm.value);

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // @ts-ignore
    // @ts-ignore
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login(): void{
    if (this.loginForm.valid){
      this.subscription = this.userService.login(this.loginForm.value)
        .subscribe(data => {
          console.log('subscribed data ' + data);
          this.isLoggedIn = data;
          if (data == true){
            this.validMessage = 'Logged in successfully';
            this.loginForm.reset();
          }else{
            this.validMessage = 'Username or password incorrect. Please try again';
          }
        },
          error => {
          return Observable.throw(error);
          });
    }else {
      this.validMessage = 'Please fill in the information.';
    }
  }

}
