import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {CoursesService} from '../courses.service';
import {Course} from '../Course';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit, OnChanges {
  @Input() editedCourse: Course;
  modelForm: FormGroup;
  isEditing = false;

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
    required: 'Field is required',
    min: 'Value too low',
    max: 'Value too big'
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

    this.modelForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.onControlValueChanged();
    });

    this.onControlValueChanged();
  }

  ngOnChanges(): void {
    if (this.editedCourse) {
      this.isEditing = true;
      const { name, ECTS, semester, form, studentsLimit, avatar, description } = this.editedCourse;
      this.modelForm = this.formBuilder.group({
        name: [name, Validators.required],
        ECTS: [ECTS, [Validators.required, Validators.min(0), Validators.max(10)]],
        semester: [semester, [Validators.required, Validators.min(1), Validators.max(10)]],
        form: [form],
        studentsLimit: [studentsLimit],
        avatar: [avatar],
        description: [description],
      });
    }
  }

  cancelEditing() {
    this.isEditing = false;
    this.modelForm.reset();
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
    if (form.status === 'VALID') {
      if (this.isEditing) {
        this.coursesService.editCourse(this.editedCourse.id, form.value);
      } else {
        this.coursesService.addCourse(form.value);
      }
      this.modelForm.reset();
    }
  }

}
