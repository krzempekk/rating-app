import { Injectable } from '@angular/core';
import {User} from './User';
import {CoursesService} from './courses.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {BehaviorSubject, Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  userSubject = new Subject<User[]>();
  userObservable$ = this.userSubject.asObservable();
  userLoaded = false;

  constructor(private coursesService: CoursesService, private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.user = null;

    this.afAuth.authState.subscribe(authData => {
      if (authData) {
        this.db.list('/users', ref => ref.orderByChild('email').limitToFirst(1).equalTo(authData.email)).snapshotChanges().subscribe(response => {
          this.user = { ...response[0].payload.val(), id: response[0].key };
          this.userSubject.next(this.user);
          this.userLoaded = true;
        });
      } else {
        this.user = null;
        this.userSubject.next(null);
        this.userLoaded = true;
      }
    });
  }

  signInUser(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  registerUser(email, password) {
    this.db.list('/users').push({ email, roles: ['STUDENT'] });
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signOutUser() {
    return this.afAuth.auth.signOut();
  }

  hasRole(_role: string): boolean {
    return this.user && !!this.user.roles.find(role => role === _role);
  }

  enroll(id: string): boolean {
    if (this.user.coursesEnrollment && this.user.coursesEnrollment.find(course => course.id === id)) {
      return false;
    } else {
      let { coursesEnrollment } = this.user;
      if (coursesEnrollment) {
        coursesEnrollment.push({ id });
      } else {
        coursesEnrollment = [{ id }];
      }
      this.db.object(`/users/${this.user.id}`).update({ coursesEnrollment });
      this.coursesService.enroll(id);
      return true;
    }
  }

  isEnrolled(id: string): boolean {
    return this.user.coursesEnrollment && !!this.user.coursesEnrollment.find(course => course.id === id);
  }

  getRating(id: string): number {
    return this.user.coursesEnrollment.find(course => course.id === id).rating;
  }

  setRating(id: string, rating: number) {
    const courseRating = this.user.coursesEnrollment.find(course => course.id === id);
    if (courseRating.rating) {
      this.coursesService.changeRate(id, courseRating.rating, rating);
    } else {
      this.coursesService.rateCourse(id, rating);
    }
    courseRating.rating = rating;
    this.db.object(`/users/${this.user.id}`).update({ coursesEnrollment: this.user.coursesEnrollment });
  }
}
