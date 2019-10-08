import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { Route } from '../shared/constants'
import { SettingsComponent } from './settings.component'
import { AuthGuard } from '../auth-guard.service'
import { GeneralLookupComponent } from './general-lookup/general-lookup.component'

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  },
  {
    path: Route.genericSettings,
    component: GeneralLookupComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
