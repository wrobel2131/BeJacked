import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAppComponent } from './components/home-app/home-app.component';
import { ManageExercisesComponent } from './components/manage-exercises/manage-exercises.component';
import { ManageProgramsComponent } from './components/manage-programs/manage-programs.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ProgramsComponent } from './components/programs/programs.component';
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
        data: { roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRAINER'] },
      },
      {
        path: 'programs',
        component: ProgramsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_TRAINER'] },
      },
      {
        path: 'logs',
        component: ProgramsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['ROLE_nsons'] },
      },
      {
        path: 'admin/programs',
        component: ManageProgramsComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'admin/users',
        component: ManageUsersComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'admin/exercises',
        component: ManageExercisesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAppRoutingModule {}
