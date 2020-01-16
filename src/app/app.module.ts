import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CourseAddComponent } from './course-add/course-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CoursesFilterComponent } from './courses-filter/courses-filter.component';
import { CourseNameFilterPipe, CourseECTSFilterPipe, CourseSemesterFilterPipe, CourseRateFilterPipe } from './courses-filter.pipe';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { MenuComponent } from './menu/menu.component';
import { CoursesAdminComponent } from './courses-admin/courses-admin.component';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    CoursesListComponent,
    StarRatingComponent,
    CourseAddComponent,
    CoursesFilterComponent,
    CourseNameFilterPipe,
    CourseECTSFilterPipe,
    CourseSemesterFilterPipe,
    CourseRateFilterPipe,
    CourseDetailsComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    CoursesAdminComponent,
    PaginationComponent,
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
