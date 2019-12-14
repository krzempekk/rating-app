import { Injectable } from '@angular/core';
import {User} from './User';
import mockUsers from './mockUsers';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor(private authService: AuthService) {
    this.authService.userData.subscribe(authData => {
      if (authData) {
        this.user = mockUsers[0];
      } else {
        this.user = null;
      }
    });
  }

  hasRole(_role: string): boolean {
    return !!this.user.roles.find(role => role === _role);
  }

  enroll(id: number): boolean {
    if (this.user.coursesEnrollment.find(course => course.id === id)) {
      return false;
    } else {
      this.user.coursesEnrollment.push({ id });
      return true;
    }
  }

  isEnrolled(id: number): boolean {
    return !!this.user.coursesEnrollment.find(course => course.id === id);
  }

  getRating(id: number): number {
    return this.user.coursesEnrollment.find(course => course.id === id).rating;
  }

  setRating(id: number, rating: number) {
    const courseRating = this.user.coursesEnrollment.find(course => course.id === id);
    if (courseRating) {
      courseRating.rating = rating;
    } else {
      this.user.coursesEnrollment.push({ id, rating });
    }
  }
}
