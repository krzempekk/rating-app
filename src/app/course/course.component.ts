import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../Course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() deleteCourse = new EventEmitter();
  userRating: number;

  constructor() {
  }

  ngOnInit() {
  }

  onRatingChanged(event) {
    this.userRating = event;
  }
}
