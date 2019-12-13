import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {CoursesService} from '../courses.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  modelForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private coursesService: CoursesService) {
  }

  formErrors = {
    name: '',
    ECTS: '',
    semester: '',
    form: '',
    studentsLimit: '',
    avatar: '',
    description: '',
  };

  private validationMessages = {
    required: 'field is required',
    min: 'value too low',
    max: 'value too big'
  };

  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      ECTS: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      semester: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      form: [''],
      studentsLimit: [''],
      avatar: [''],
      description: [''],
    });

    this.modelForm.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.onControlValueChanged();
    });

    this.onControlValueChanged();
  }

  onControlValueChanged() {
    const form = this.modelForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        for (const key in control.errors) {
          this.formErrors[field] += this.validationMessages[key] + ' ';
        }
      }
    }
  }

  onSubmit(form) {
    if(form.status === 'VALID') {
      this.coursesService.addCourse(form.value);
    }
  }

}
