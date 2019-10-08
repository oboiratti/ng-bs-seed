import { NgModule } from '@angular/core'

import { ReportRoutingModule } from './report-routing.module'
import { ReportComponent } from './report.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [ReportComponent],
  imports: [SharedModule, ReportRoutingModule]
})
export class ReportModule {}
