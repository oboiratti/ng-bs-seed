import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { Route } from '../shared/constants'
import { ProfileComponent } from './profile.component'
import { AuthGuard } from '../auth-guard.service'
import { ProfileFormComponent } from './profile-form/profile-form.component'
import { ChangePasswordComponent } from './change-password/change-password.component'

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: Route.profileForm,
        component: ProfileFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: Route.changePassword,
        component: ChangePasswordComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
