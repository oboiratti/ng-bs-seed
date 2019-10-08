import { NgModule } from '@angular/core'

import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './profile.component'
import { SharedModule } from '../shared/shared.module'
import { ProfileFormComponent } from './profile-form/profile-form.component'
import { ChangePasswordComponent } from './change-password/change-password.component'

@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  declarations: [
    ProfileComponent,
    ProfileFormComponent,
    ChangePasswordComponent
  ]
})
export class ProfileModule {}
