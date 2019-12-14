import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  modelForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

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
  }

  onSubmit(form) {
    if (form.status === 'VALID') {
      this.authService.registerUser(form.value.email, form.value.password)
        .then(result => {
          this.router.navigateByUrl('/');
        });
    }
  }


}
