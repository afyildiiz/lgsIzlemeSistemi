import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    RegisterFormComponent,
    FooterComponent,
    HomepageComponent,
    TeacherRegisterFormComponent
  ],
  imports: [
    BrowserModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
