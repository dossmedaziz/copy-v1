import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillsComponent } from './files/bills/bills.component';
import { ContractsComponent } from './files/contracts/contracts.component';
import { OthersComponent } from './files/others/others.component';
import { LayoutComponent } from './layout/layout.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      
      {
        path:'',
        redirectTo:'/dashboard',
        pathMatch:'full'
      },
       {
        path:'users',
        component:UsersComponent
       },

      {
        path:'clients',
        component:ClientsComponent

      },

      {
        path:'projects',
        component:ProjectsComponent

      },
      {
        path:'bills',
        component:BillsComponent
      },
      {
        path:'contracts',
        component:ContractsComponent
      },
      {
        path:'others',
        component:OthersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
