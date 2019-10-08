import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './auth/login.component'
import { AuthGuard } from './auth-guard.service'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SettingsComponent } from './settings/settings.component'
import { GeneralLookupComponent } from './settings/general-lookup/general-lookup.component'
import { PageNotFoundComponent } from './page-not-found.component'
import { Route } from './shared/constants'

const routes: Routes = [
  {
    path: Route.login,
    loadChildren: () =>
      import('./auth/auth.module').then(module => module.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: Route.dashboard,
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Route.product,
    loadChildren: () =>
      import('./products/products.module').then(
        module => module.ProductsModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: Route.reports,
    loadChildren: () =>
      import('./report/report.module').then(module => module.ReportModule),
    canActivate: [AuthGuard]
  },
  {
    path: Route.profile,
    loadChildren: () =>
      import('./profile/profile.module').then(module => module.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: Route.settings,
    loadChildren: () =>
      import('./settings/settings.module').then(
        module => module.SettingsModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: `/${Route.dashboard}`,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
