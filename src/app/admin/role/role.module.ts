import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'

import { StoreModule } from '@ngrx/store'
import { SharedModule } from 'src/app/shared/shared.module'
import { RoleRoutingModule } from './role-routing.module'
import { RoleComponent } from './role.component'
import { RoleEffects } from './state/role.effects'
import * as fromRole from './state/role.reducer'

@NgModule({
  imports: [
    SharedModule,
    RoleRoutingModule,
    StoreModule.forFeature(fromRole.roleFeatureKey, fromRole.reducer),
    EffectsModule.forFeature([RoleEffects]),
  ],
  declarations: [RoleComponent],
})
export class RoleModule {}
