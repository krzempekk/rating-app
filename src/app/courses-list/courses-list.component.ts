import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Course } from '../Course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  filters: { name?: string, ECTS?: number, semester?: number, rate?: number };
  paginationStart = 0;
  elementsOnPage = 3;

  constructor(private coursesService: CoursesService) {
    coursesService.coursesObservable$.subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = courses;
    });
  }

  ngOnInit() {
    this.filters = {};
    this.getCourses();
  }

  getCourses(): void {
    this.courses = this.coursesService.getCourses();
    this.filteredCourses = this.coursesService.getCourses();
  }

  filterCourses(values) {
    this.paginationStart = 0;
    this.filters = values;
    const { name: nameFilter, ECTS: ECTSFilter, semester: semesterFilter, rate: rateFilter } = this.filters;
    this.filteredCourses = this.courses
      .filter(course => !nameFilter || course.name.toLowerCase().includes(nameFilter.toLowerCase()))
      .filter(course => !ECTSFilter || course.ECTS === ECTSFilter)
      .filter(course => !semesterFilter || course.semester === semesterFilter)
      .filter(course => !rateFilter || (course.ratingCount === 0 ? 0 : (course.ratingSum / course.ratingCount)) === rateFilter);
  }

  paginationChanged(newValue) {
    const { paginationStart, elementsOnPage } = newValue;
    this.paginationStart = paginationStart;
    this.elementsOnPage = elementsOnPage;
  }
}
