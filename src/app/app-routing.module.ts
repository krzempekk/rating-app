import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesListComponent} from './courses-list/courses-list.component';
import {CourseDetailsComponent} from './course-details/course-details.component';

const routes: Routes = [
  { path: '', component: CoursesListComponent },
  { path: 'course/:id', component: CourseDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
