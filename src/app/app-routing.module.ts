import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddBillComponent } from './files/add-bill/add-bill.component';
import { BillsComponent } from './files/bills/bills.component';
import { ContractsComponent } from './files/contracts/contracts.component';
import { OthersComponent } from './files/others/others.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'dashboard',
        component:DashboardComponent,
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
        path:'roles',
        component:RolesComponent

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
      },
      {
        path:'addBill',
        component:AddBillComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
