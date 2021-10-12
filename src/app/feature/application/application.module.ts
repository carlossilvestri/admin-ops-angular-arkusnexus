import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationRoutingModule } from './application-routing.module';
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

@NgModule({
  declarations: [
    ApplicationBarComponent,
    MyUserComponent,
    ApplicationHeaderComponent,
    PaginationComponent,
    ApplicationComponent,
    TeamsComponent,
    UsersComponent,
    AccountsComponent,
    MovementTeamsComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})

export class ApplicationModule {
}
