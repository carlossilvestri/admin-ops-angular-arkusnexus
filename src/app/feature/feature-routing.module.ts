import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'application',
    loadChildren: () => import('./application/application.module').then(i => i.ApplicationModule) ,
  }, 
  {
    path: '',
    loadChildren: () => import('./setup/setup.module').then(i => i.SetUpModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {
}
