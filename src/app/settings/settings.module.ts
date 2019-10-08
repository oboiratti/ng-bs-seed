import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SettingsRoutingModule } from './settings-routing.module'
import { SettingsComponent } from './settings.component'
import { SharedModule } from '../shared/shared.module'
import { GeneralLookupComponent } from './general-lookup/general-lookup.component'

@NgModule({
  declarations: [SettingsComponent, GeneralLookupComponent],
  imports: [SharedModule, SettingsRoutingModule]
})
export class SettingsModule {}
