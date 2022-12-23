import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAppComponent } from './components/home-app/home-app.component';
import { PlansComponent } from './components/plans/plans.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeAppComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: ["ROLE_ADMIN", "ROLE_USER", "ROLE_TRAINER"]}
      },
      {
        path:'plans',
        component: PlansComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: ["ROLE_ADMIN", "ROLE_USER", "ROLE_TRAINER"]}
      },
      {
        path:'logs',
        component: PlansComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: ["ROLE_nsons"]}
      },
      {
        path:'admin/plans',
        component: PlansComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: ["ROLE_ADMIN"]}
      },
      {
        path:'admin/users',
        component: PlansComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: ["ROLE_ADMIN"]}
      },
      {
        path:'admin/exercises',
        component: PlansComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: ["ROLE_ADMIN"]}
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeAppRoutingModule { }
