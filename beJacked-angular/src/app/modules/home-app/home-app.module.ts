import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeAppRoutingModule } from './home-app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeAppComponent } from './components/home-app/home-app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderConfig, SPINNER, PB_DIRECTION, POSITION, NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { PlansComponent } from './components/plans/plans.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManagePlansComponent } from './components/manage-plans/manage-plans.component';
import { ManageExercisesComponent } from './components/manage-exercises/manage-exercises.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeAppComponent,
    PlansComponent,
    ManageUsersComponent,
    ManagePlansComponent,
    ManageExercisesComponent,
  ],
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    HomeAppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
 

  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HomeAppModule { }
