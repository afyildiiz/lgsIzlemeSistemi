import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './views/pages/homepage/homepage/homepage.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { LoginFormComponent } from './views/components/login-form/login-form/login-form.component';
import { StudentHomeComponent } from './views/pages/LoggedInHomepage/logged-in/student-home.component';
import { ProfileComponent } from './views/components/profil/profile/profile.component';
import { EditStudentComponent } from './views/components/edit-student/edit-student.component';
import { TeacherHomeComponent } from './views/pages/teacherHomepage/teacher/teacher-home.component';
import { StudentProfileComponent } from './views/components/student-profile/student-profile/student-profile.component';
import { StudentLessonsComponent } from './views/components/student-lessons/student-lessons/student-lessons.component';
import { SchoolHomeComponent } from './views/pages/schoolHomepage/school-home/school-home.component';
import { SchoolProfileComponent } from './views/components/school-profile/school-profile/school-profile.component';
import { TeacherListComponent } from './views/components/teacher-list/teacher-list/teacher-list.component';
import { StudentListComponent } from './views/components/student-list/student-list/student-list.component';

const routes: Routes = [
  {
    path: '', component: HomepageComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginFormComponent
  },
  {
    path: 'teacherhomepage', component: TeacherHomeComponent, children: [

      { path: 'profile', component: ProfileComponent },
      { path: 'students', component: EditStudentComponent },

    ]
  },
  {
    path: 'studenthomepage', component: StudentHomeComponent, children: [
      { path: 'profile', component: StudentProfileComponent },
      { path: 'lessons', component: StudentLessonsComponent }

    ]
  },
  {
    path: 'schoolhomepage', component: SchoolHomeComponent, children: [
      { path: 'profile', component: SchoolProfileComponent },
      { path: 'teachers', component: TeacherListComponent },
      { path: 'students', component: StudentListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
