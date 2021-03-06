import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesListComponent} from './courses-list/courses-list.component';
import {CourseDetailsComponent} from './course-details/course-details.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {CoursesAdminComponent} from './courses-admin/courses-admin.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: CoursesListComponent },
  { path: 'admin', component: CoursesAdminComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'course/:id', component: CourseDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
