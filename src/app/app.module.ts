import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CourseAddComponent } from './course-add/course-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CoursesFilterComponent } from './courses-filter/courses-filter.component';
import { CoursesFilterPipe } from './courses-filter.pipe';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CoursesListComponent,
    CourseComponent,
    StarRatingComponent,
    CourseAddComponent,
    CoursesFilterComponent,
    CoursesFilterPipe,
    CourseDetailsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
