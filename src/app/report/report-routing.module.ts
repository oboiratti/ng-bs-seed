import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { Route } from '../shared/constants'
import { ReportComponent } from './report.component'
import { AuthGuard } from '../auth-guard.service'

const routes: Routes = [
  {
    path: '',
    component: ReportComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
