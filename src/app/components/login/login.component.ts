import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validMessage = '';
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

  login(){
    if (this.loginForm.valid){
    if (this.userService.login(this.loginForm.value)){
      this.validMessage = 'Logged in successfully';

      // @ts-ignore
      this.userService.login(this.loginForm.value).subscribe()(
        data => {
          console.log(data);
          this.loginForm.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      );
    }else{
      this.validMessage = 'Username or password incorrect. Please try again';
    }
  }else {
      this.validMessage = 'Please fill in the information.';
    }
  }

}
