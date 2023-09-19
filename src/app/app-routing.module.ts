import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './views/pages/homepage/homepage/homepage.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { DenemeComponent } from './views/pages/deneme/deneme/deneme.component';
const routes: Routes = [
  {
    path: '', component: HomepageComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: DenemeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
