import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../courses.service';
import {UserService} from '../user.service';

enum EnrollmentStatus {
  ENROLLED = 'ENROLLED',
  CAN_ENROLL = 'CAN_ENROLL',
  CANT_ENROLL = 'CANT_ENROLL'
}

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course: any;
  rating: number;
  isAuthenticated: boolean;
  enrollmentStatus: EnrollmentStatus = EnrollmentStatus.CANT_ENROLL;
  EnrollmentStatus = EnrollmentStatus;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private userService: UserService) {
  }

  ngOnInit() {
    this.getCourse();
  }

  getCourse() {
    const id = this.route.snapshot.paramMap.get('id');
    this.coursesService.getCourse(id).subscribe(course => {
      this.course = course;

      this.updateEnrollmentInfo(this.userService.user);

      this.userService.userObservable$.subscribe(user => {
        this.updateEnrollmentInfo(user);
      });
    });
  }

  updateEnrollmentInfo(user) {
    const { id, studentsEnrolled, studentsLimit } = this.course;

    this.isAuthenticated = !!user;
    if (this.isAuthenticated) {
      if (this.userService.isEnrolled(id)) {
        this.enrollmentStatus = EnrollmentStatus.ENROLLED;
        this.rating = this.userService.getRating(id);
      } else if (this.userService.hasRole('STUDENT') && (!studentsLimit || studentsEnrolled < studentsLimit)) {
        this.enrollmentStatus = EnrollmentStatus.CAN_ENROLL;
      }
    }
  }

  enroll() {
    const { id } = this.course;
    this.userService.enroll(id);
    this.enrollmentStatus = EnrollmentStatus.ENROLLED;
  }

  onRatingChanged(rating) {
    const { id } = this.course;
    this.userService.setRating(id, rating);
    this.rating = rating;
  }

}
