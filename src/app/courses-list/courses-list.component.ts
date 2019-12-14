import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Course } from '../Course';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: Course[];

  constructor(private coursesService: CoursesService, private authService: AuthService) {
    coursesService.coursesObservable$.subscribe(courses => this.courses = courses);
  }

  getCourses(): void {
    this.courses = this.coursesService.getCourses();
  }

  ngOnInit() {
    this.getCourses();
  }


  onDeleteCourse(id: number): void {
    this.coursesService.deleteCourse(id);
  }
}
