import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userForm: FormGroup;
  validMessage = '';

  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  submitRegistration(){
    if (this.userForm.valid){
      this.validMessage = 'Registration successful';
      // @ts-ignore
      this.userService.signup(this.userForm.value).subscribe()(
        data => {
          console.log(data);
          this.userForm.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      );
    }else {
      this.validMessage = 'Please fill out the form before submitting!';
    }
  }

}
