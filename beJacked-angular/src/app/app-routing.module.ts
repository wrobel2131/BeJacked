import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "app",
    loadChildren: () => import('./modules/home-app/home-app.module').then(m => m.HomeAppModule),
  },
  {
    path: "",
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
