import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-courses-filter',
  templateUrl: './courses-filter.component.html',
  styleUrls: ['./courses-filter.component.css']
})
export class CoursesFilterComponent implements OnInit {
  modelForm: FormGroup;
  @Output() filterCourses = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      name: [''],
      ECTS: [''],
      semester: [''],
      rate: ['']
    });
  }

  onSubmit(form) {
    this.filterCourses.emit(form.value);
  }

}
