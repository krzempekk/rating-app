import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modelForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
  }

  formErrors = {
    email: '',
    password: '',
  };

  private validationMessages = {
    required: 'field is required',
  };

  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // this.modelForm.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
    //   this.onControlValueChanged();
    // });
    //
    // this.onControlValueChanged();
  }

  // onControlValueChanged() {
  //   const form = this.modelForm;
  //   for (const field in this.formErrors) {
  //     this.formErrors[field] = '';
  //     const control = form.get(field);
  //
  //     if (control && control.dirty && !control.valid) {
  //       for (const key in control.errors) {
  //         this.formErrors[field] += this.validationMessages[key] + ' ';
  //       }
  //     }
  //   }
  // }

  onSubmit(form) {
    if (form.status === 'VALID') {
      this.userService.signInUser(form.value.email, form.value.password)
        .then(result => {
          this.router.navigateByUrl('/');
        })
        .catch(error => {
          this.formErrors.email = error.message;
        });
    }
  }

}
