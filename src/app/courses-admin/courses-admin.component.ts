import { Component, OnInit } from '@angular/core';
import { Course } from '../Course';
import { CoursesService } from '../courses.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-courses-admin',
  templateUrl: './courses-admin.component.html',
  styleUrls: ['./courses-admin.component.css']
})
export class CoursesAdminComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  filters: { name?: string, ECTS?: number, semester?: number, rate?: number };
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  paginationStart = 0;
  elementsOnPage = 3;
  editedCourse: Course;

  constructor(private coursesService: CoursesService) {
    coursesService.coursesObservable$.subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = courses;
    });
  }

  ngOnInit() {
    this.filters = {};
    this.courses = this.coursesService.getCourses();
    this.filteredCourses = this.coursesService.getCourses();
    this.editedCourse = null;
  }

  onEditCourse(id: string) {
    this.editedCourse = this.courses.find(course => course.id === id);
  }

  onDeleteCourse(id: string): void {
    this.coursesService.deleteCourse(id);
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
