import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../Course';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../courses.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course: Course;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) { }

  ngOnInit() {
    this.getCourse();
  }

  getCourse() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.course = this.coursesService.getCourse(id);
  }

}
