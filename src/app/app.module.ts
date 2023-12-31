import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataBySheetHelper } from './models/excel-models/dataBySheet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import SheetHelper from './models/excel-models/sheet';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbThemeModule, NbDatepickerModule, NbLayoutModule, NbSidebarModule, NbUserModule, NbCardModule, NbInputModule, NbIconModule, NbButtonModule, NbMenuModule, NbDialogModule, NbWindowModule, NbToastrModule, NbSelectModule, NbStepperModule, NbContextMenuModule, NbListModule, NbToggleModule, NbCheckboxModule, NbRadioModule, NbTabsetModule, NbDialogRef, NbButton, NbTreeGridModule, NbAccordionModule, NbBadgeModule, NbTooltipModule, NbSpinnerModule, NbLayoutHeaderComponent, NbLayoutFooterComponent } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header/header.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { RegisterFormComponent } from './views/components/register-form/register-form.component';
import { FooterComponent } from './layout/footer/footer/footer.component';
import { HomepageComponent } from './views/pages/homepage/homepage/homepage.component';
import { TeacherRegisterFormComponent } from './views/components/teacher-register-form/teacher-register-form/teacher-register-form.component';
import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import { RegisterTopBarComponent } from './views/components/register-top-bar/register-top-bar/register-top-bar.component';
import { ExcelComponent } from './views/components/excel/excel/excel.component';
import { StudentRegisterFormComponent } from './views/components/student-register-form/student-register-form/student-register-form.component';
import { ExcelFormComponent } from './views/components/excel-form/excel-form/excel-form.component';
import { DenemeComponent } from './views/pages/deneme/deneme/deneme.component';
import { ConfirmationModalComponent } from './views/components/confirmation-modal/confirmation-modal/confirmation-modal.component';
import { TextModalComponent } from './views/components/text-modal/text-modal/text-modal.component';
import { AddSheetComponent } from './views/components/add-sheet/add-sheet/add-sheet.component';
import { SheetFormComponent } from './views/components/sheet-form/sheet-form/sheet-form.component';
import { LoginComponent } from './views/pages/login/login/login.component';
import { LoginFormComponent } from './views/components/login-form/login-form/login-form.component';
import { StudentHomeComponent } from './views/pages/LoggedInHomepage/logged-in/student-home.component';
import { TeacherHomeComponent } from './views/pages/teacherHomepage/teacher/teacher-home.component';
import { ProfileComponent } from './views/components/profil/profile/profile.component';
import { EditStudentComponent } from './views/components/edit-student/edit-student.component';
import { StudentProfileComponent } from './views/components/student-profile/student-profile/student-profile.component';
import { StudentLessonsComponent } from './views/components/student-lessons/student-lessons/student-lessons.component';
import { SchoolHomeComponent } from './views/pages/schoolHomepage/school-home/school-home.component';
import { SchoolProfileComponent } from './views/components/school-profile/school-profile/school-profile.component';
import { TeacherListComponent } from './views/components/teacher-list/teacher-list/teacher-list.component';
import { StudentListComponent } from './views/components/student-list/student-list/student-list.component';
import { LogPageComponent } from './views/components/logPage/log-page/log-page.component';
import { AssignMentorComponent } from './views/components/assign-mentor/assign-mentor/assign-mentor.component';
import { AddStudentComponent } from './views/components/add-student/add-student/add-student.component';
import { AddTeacherComponent } from './views/components/add-teacher/add-teacher/add-teacher.component';
import { LessonsCategoriesComponent } from './views/components/lessons-categories/lessons-categories/lessons-categories.component';
import { TeacherLogComponent } from './views/components/teacher-log/teacher-log.component';
import { LogByTeacherComponent } from './views/components/log-by-teacher/log-by-teacher/log-by-teacher.component';
import { GoLogPageComponent } from './views/components/go-log-page/go-log-page/go-log-page.component';
import { GetLogPageComponent } from './views/components/get-log-page/get-log-page/get-log-page.component';
import { ResultCardComponent } from './views/components/result-card/result-card/result-card.component';
import { StudentPerformComponent } from './views/components/student-perform/student-perform/student-perform.component';
import { DeleteUserComponent } from './views/components/delete/delete-user/delete-user.component';
import { StudentNavbarComponent } from './views/components/student-navbar/student-navbar.component';
import { UpdateNoteComponent } from './views/components/update-note/update-note/update-note.component';
import { StudentDetailComponent } from './views/components/student-detail/student-detail/student-detail.component';
import { LessonDetailComponent } from './views/components/lesson-detail/lesson-detail/lesson-detail.component';
import { AdminComponent } from './views/pages/admin/admin/admin.component';
import { AdminFormComponent } from './views/components/admin-form/admin-form/admin-form.component';

registerAllModules()

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    RegisterFormComponent,
    FooterComponent,
    HomepageComponent,
    TeacherRegisterFormComponent,
    RegisterTopBarComponent,
    ExcelComponent,
    StudentRegisterFormComponent,
    ExcelFormComponent,
    DenemeComponent,
    ConfirmationModalComponent,
    TextModalComponent,
    AddSheetComponent,
    SheetFormComponent,
    LoginComponent,
    LoginFormComponent,
    StudentHomeComponent,
    TeacherHomeComponent,
    ProfileComponent,
    EditStudentComponent,
    StudentProfileComponent,
    StudentLessonsComponent,
    SchoolHomeComponent,
    SchoolProfileComponent,
    TeacherListComponent,
    StudentListComponent,
    LogPageComponent,
    AssignMentorComponent,
    AddStudentComponent,
    AddTeacherComponent,
    LessonsCategoriesComponent,
    TeacherLogComponent,
    LogByTeacherComponent,
    GoLogPageComponent,
    GetLogPageComponent,
    ResultCardComponent,
    StudentPerformComponent,
    DeleteUserComponent,
    StudentNavbarComponent,
    UpdateNoteComponent,
    StudentDetailComponent,
    LessonDetailComponent,
    AdminComponent,
    AdminFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbSpinnerModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbUserModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbTooltipModule,
    NbSelectModule,
    NbBadgeModule,
    NbStepperModule,
    NbIconModule,
    NbToggleModule,
    NbCheckboxModule,
    NbAccordionModule,
    NbRadioModule,
    NbListModule,
    NbDatepickerModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbContextMenuModule,
    NbTabsetModule,
    NbTreeGridModule,
    NbEvaIconsModule,
    NbCardModule,
    NbLayoutModule,
    HotTableModule
  ],
  providers: [DataBySheetHelper, SheetHelper],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
