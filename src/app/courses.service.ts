import { Injectable } from '@angular/core';
import { Course } from './Course';
import {Subject} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: any[];
  coursesSubject = new Subject<Course[]>();
  coursesObservable$ = this.coursesSubject.asObservable();

  constructor(private db: AngularFireDatabase) {
    this.courses = [];
    db.list('/courses').snapshotChanges().subscribe((data) => {
      this.courses = [];
      data.forEach(course => {
        this.courses.push({ ...course.payload.val(), id: course.key });
      });
      this.coursesSubject.next(this.courses);
    });
  }

  getCourses(): Course[] {
    return this.courses;
  }

  getCourse(id: string) {
    return this.db.list('/courses').snapshotChanges().pipe(map((data) => {
      const course = data.find(c => c.key === id);
      return { ...course.payload.val(), id: course.key };
    }));
  }

  addCourse(course: Course): void {
    this.db.list('/courses').push({ ...course, studentsEnrolled: 0, ratingCount: 0, ratingSum: 0 });
  }

  editCourse(id: string, course: Course) {
    this.db.object(`/courses/${id}`).update({ ...course });
  }

  deleteCourse(id: string): void {
    this.db.object(`/courses/${id}`).remove();
  }

  rateCourse(id: string, rating: number): void {
    const course = this.courses.find(c => c.id === id);
    const { ratingSum, ratingCount } = course;
    this.db.object(`/courses/${id}`).update({ ratingSum: ratingSum + rating, ratingCount: ratingCount + 1 });
  }

  changeRate(id: string, oldRating: number, newRating: number) {
    const course = this.courses.find(c => c.id === id);
    const { ratingSum, ratingCount } = course;
    this.db.object(`/courses/${id}`).update({ ratingSum: ratingSum + (newRating - oldRating), ratingCount });
  }

  enroll(id: string) {
    const course = this.courses.find(c => c.id === id);
    const { studentsEnrolled } = course;
    this.db.object(`/courses/${id}`).update({ studentsEnrolled: studentsEnrolled + 1 });
  }
}
