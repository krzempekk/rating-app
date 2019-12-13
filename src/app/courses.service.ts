import { Injectable } from '@angular/core';
import { Course } from './Course';
import mockCourses from './mockCourses';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: Course[];
  coursesSubject = new Subject<Course[]>();
  coursesObservable$ = this.coursesSubject.asObservable();

  constructor() {
    this.courses = mockCourses;
  }

  getCourses(): Course[] {
    return this.courses;
  }

  getCourse(id: number): Course {
    return this.courses.find(value => value.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
    this.coursesSubject.next(this.courses);
  }

  deleteCourse(id: number): void {
    this.courses = this.courses.filter(value => value.id !== id);
    this.coursesSubject.next(this.courses);
  }
}
