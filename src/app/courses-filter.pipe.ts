import {Pipe, PipeTransform} from '@angular/core';
import {Course} from './Course';

@Pipe({ name: 'coursesFilterPipe' })
export class CoursesFilterPipe implements PipeTransform {
  transform(courses: Course[], searchText: string): Course[] {
    if (!courses) { return []; }
    if (!searchText) { return courses; }
    searchText = searchText.toLowerCase();
    return courses.filter(course => course.name.toLowerCase().includes(searchText));
  }
}
