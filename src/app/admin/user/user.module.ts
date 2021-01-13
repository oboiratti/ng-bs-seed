import { NgModule } from '@angular/core'

import { StoreModule } from '@ngrx/store'
import { SharedModule } from 'src/app/shared/shared.module'
import { UserRoutingModule } from './user-routing.module'
import { UserComponent } from './user.component'
import * as fromUser from './state/user.reducer'
import { EffectsModule } from '@ngrx/effects'
import { UserEffects } from './state/user.effects'

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule,
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  declarations: [UserComponent],
})
export class UserModule {}
