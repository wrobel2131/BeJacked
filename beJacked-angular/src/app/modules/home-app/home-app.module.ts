import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeAppRoutingModule } from './home-app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeAppComponent } from './components/home-app/home-app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ManageExercisesComponent } from './components/manage-exercises/manage-exercises.component';
import { ManageProgramsComponent } from './components/manage-programs/manage-programs.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { NewProgramComponent } from './components/new-program/new-program.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { ProgramDetailsComponent } from './components/program-details/program-details.component';
import { SortByDatePipe } from 'src/app/shared/pipes/sort-by-date.pipe';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ErrorMessageComponent } from 'src/app/shared/dialogs/error-message/error-message.component';
import { SuccessMessageComponent } from 'src/app/shared/dialogs/success-message/success-message.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeAppComponent,
    ProgramsComponent,
    ManageUsersComponent,
    ManageProgramsComponent,
    ManageExercisesComponent,
    NewProgramComponent,
    ProgramDetailsComponent,
    SortByDatePipe,
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    HomeAppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeAppModule {}
