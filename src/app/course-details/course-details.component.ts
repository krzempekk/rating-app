import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../Course';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../courses.service';
import {AuthService} from '../auth.service';
import {UserService} from '../user.service';

enum EnrollmentStatus {
  ENROLLLED = 'ENROLLED',
  CAN_ENROLL = 'CAN_ENROLL',
  CANT_ENROLL = 'CANT_ENROLL'
}


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course: Course;
  canEnroll: boolean;
  isEnrolled: boolean;
  rating: number;
  isAuthenticated: boolean;
  enrollmentStatus: EnrollmentStatus = EnrollmentStatus.CANT_ENROLL;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {
    this.getCourse();
    const { id, studentsEnrolled, studentsLimit } = this.course;
    this.authService.userData.subscribe(authData => {
      this.isAuthenticated = !!authData;
      if (this.isAuthenticated) {
        this.canEnroll = this.userService.hasRole('STUDENT') && !this.userService.isEnrolled(id) && studentsEnrolled < studentsLimit;
        this.isEnrolled = this.userService.isEnrolled(id);
        if (this.isEnrolled) {
          this.rating = this.userService.getRating(id);
        }
      }
    });
  }

  getCourse() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.course = this.coursesService.getCourse(id);
  }

  enroll() {
    const { id } = this.course;
    this.userService.enroll(id);
    this.isEnrolled = true;
    this.course.studentsEnrolled++;
    this.canEnroll = false;
  }

  onRatingChanged(rating) {
    const { id } = this.course;
    this.rating = rating;
    this.userService.setRating(id, rating);
  }

}
