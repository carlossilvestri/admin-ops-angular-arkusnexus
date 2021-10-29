import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationRoutingModule } from './application-routing.module';
import { DatePipe } from '@angular/common';
// import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyUserComponent } from './my-user/my-user.component';
import { ApplicationBarComponent } from './shared/components/application-bar/application-bar.component';
import { ApplicationHeaderComponent } from './shared/components/application-header/application-header.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { ApplicationComponent } from './application/application.component';
import { TeamsComponent } from './teams/teams.component';
import { UsersComponent } from './users/users.component';
import { AccountsComponent } from './accounts/accounts.component';
import { MovementTeamsComponent } from './movement-teams/movement-teams.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { MovementTeamComponent } from './movement-teams/movement-team/movement-team.component';
import { AccountComponent } from './accounts/account/account.component';
import { TeamComponent } from './teams/team/team.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component'; 

@NgModule({
  declarations: [
    ApplicationBarComponent,
    MyUserComponent,
    ApplicationHeaderComponent,
    PaginationComponent,
    ApplicationComponent,
    TeamsComponent,
    UsersComponent,
    SearchBarComponent,
    MovementTeamsComponent,
    MovementTeamComponent,
    AccountsComponent,
    AccountComponent,
    TeamComponent,
    LoadingComponent
  ],
  providers: [
    DatePipe
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // MaterialModule
  ]
})

export class ApplicationModule {
}
