import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { RoleComponent } from './role/role.component'
import { UserComponent } from './user/user.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [RoleComponent, UserComponent]
})
export class AdminModule {}
