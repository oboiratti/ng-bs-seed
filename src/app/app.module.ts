import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';
import { LoadingComponent } from './shared/loading.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './auth/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { GeneralLookupComponent } from './settings/general-lookup/general-lookup.component';
import { Interceptor } from './shared/interceptor';
import { AuthService } from './auth/auth.service';
import { RoleService } from './role/role.service';
import { UserService } from './user/user.service';
import { SettingsService } from './settings/settings.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    DashboardComponent,
    SettingsComponent,
    PageNotFoundComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    RoleComponent,
    GeneralLookupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    BlockUIModule.forRoot()
  ],
  providers: [
    {provide: 'baseApi', useValue: 'api'},
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    AuthService,
    RoleService,
    UserService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
