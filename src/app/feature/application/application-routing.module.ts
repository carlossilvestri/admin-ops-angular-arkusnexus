import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { MyUserComponent } from './my-user/my-user.component';
import { TeamsComponent } from './teams/teams.component';
import { UsersComponent } from './users/users.component';
import { AccountsComponent } from './accounts/accounts.component';
import { MovementTeamsComponent } from './movement-teams/movement-teams.component';
import { MovementTeamComponent } from './movement-teams/movement-team/movement-team.component';
import { AccountComponent } from './accounts/account/account.component';
import { TeamComponent } from './teams/team/team.component';

const MAIN = '/application';
// These routes are children from /application
const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    children: [
      { path: 'my-user', component: MyUserComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user/:id', component: MyUserComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'teams/:id', component: TeamComponent },
      { path: 'accounts', component: AccountsComponent },
      {
        path: 'movement-teams',
        component: MovementTeamsComponent,
      },
      { path: 'movement-teams/:id', component: MovementTeamComponent },
      { path: 'create-team', component: TeamComponent },
      { path: 'accounts/:id', component: AccountComponent },
      { path: 'create-account', component: AccountComponent },
    ],
  },
  { path: '**', pathMatch: '**', redirectTo: `${MAIN}/my-user` },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
