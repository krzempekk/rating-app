import {Pipe, PipeTransform} from '@angular/core';
import {Course} from './Course';

@Pipe({ name: 'courseNameFilterPipe' })
export class CourseNameFilterPipe implements PipeTransform {
  transform(courses: Course[], searchText: string): Course[] {
    if (!courses) { return []; }
    if (!searchText) { return courses; }
    searchText = searchText.toLowerCase();
    return courses.filter(course => course.name.toLowerCase().includes(searchText));
  }
}

@Pipe({ name: 'courseSemesterFilterPipe' })
export class CourseSemesterFilterPipe implements PipeTransform {
  transform(courses: Course[], semester: number): Course[] {
    if (!courses) { return []; }
    if (!semester) { return courses; }
    return courses.filter(course => course.semester === semester);
  }
}

@Pipe({ name: 'courseECTSFilterPipe' })
export class CourseECTSFilterPipe implements PipeTransform {
  transform(courses: Course[], ECTS: number): Course[] {
    if (!courses) { return []; }
    if (!ECTS) { return courses; }
    return courses.filter(course => course.ECTS === ECTS);
  }
}

@Pipe({ name: 'courseRateFilterPipe' })
export class CourseRateFilterPipe implements PipeTransform {
  transform(courses: Course[], rate: number): Course[] {
    if (!courses) { return []; }
    if (!rate) { return courses; }
    return courses.filter(course => (course.ratingCount === 0 ? 0 : (course.ratingSum / course.ratingCount)) === rate);
  }
}
