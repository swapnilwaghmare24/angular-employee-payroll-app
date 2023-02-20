import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmpComponent } from './component/add-emp/add-emp.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddEmpComponent
  },
  {
    path: '',
    component: HomeComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
