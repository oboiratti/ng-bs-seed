import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BlockUIModule } from 'ng-block-ui'

import { AppComponent } from './app.component'
import { LoadingComponent } from './shared/loading.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SettingsComponent } from './settings/settings.component'
import { PageNotFoundComponent } from './page-not-found.component'
import { LoginComponent } from './auth/login.component'
import { GeneralLookupComponent } from './settings/general-lookup/general-lookup.component'
import { Interceptor } from './shared/interceptor'
import { AuthService } from './auth/auth.service'
import { SettingsService } from './settings/settings.service'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { AdminModule } from './admin/admin.module'
import { ProfileModule } from './profile/profile.module'
import { ProductsModule } from './products/products.module'
import { ReportModule } from './report/report.module'

@NgModule({
  declarations: [AppComponent, DashboardComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AdminModule,
    CoreModule,
    BlockUIModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
