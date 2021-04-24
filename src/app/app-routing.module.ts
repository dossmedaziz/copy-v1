import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { AuthGuard } from './auth.guard';
import { ClientsComponent } from './clients/clients.component';
import { CompanyComponent } from './company/company.component';
import { AddPaperTypeComponent } from './components/add-paper-type/add-paper-type.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddBillComponent } from './files/add-bill/add-bill.component';
import { BillsComponent } from './files/bills/bills.component';
import { UpdateBillComponent } from './files/update-bill/update-bill.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { PaperManagerComponent } from './paper-manager/paper-manager.component';
import { ProjectsComponent } from './projects/projects.component';
import { RolesComponent } from './roles/roles.component';
import { SpaceGuard } from './space.guard';
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
        component:UsersComponent,
       },
      
      {
        path:'clients',
        component:ClientsComponent,

      },
      {
        path:'roles',
        component:RolesComponent,


      },
      {
        path:'projects',
        component:ProjectsComponent,
        canActivate:[SpaceGuard]


      },
      {
        path:'bills',
        component:BillsComponent,
      },
      {
        path:'addBill',
        component:AddBillComponent,
      },
      {
        path:'updateBill/:id',
        component : UpdateBillComponent
      },
      {
        path:'paperManager',
        component:PaperManagerComponent,
      },
      {
        path:'addPaperType',
        component : AddPaperTypeComponent
      },
      {
        path:'company',
        component : CompanyComponent
      },
      {
        path :'search/:keyWorld',
        component:SearchResultComponent
      },
       {
        path : 'activityLog',
        component : ActivityLogComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  
 {
   path : 'forgotPassword',
   component:ForgotPasswordComponent
 },
 {
   path : 'resetPassword/:token',
   component : ResetPasswordComponent
 } ,
 {
  path : 'updatePassword/:token',
  component : UpdatePasswordComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
