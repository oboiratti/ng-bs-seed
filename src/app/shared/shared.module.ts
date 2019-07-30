import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ReactiveFormsModule, FormsModule } from '../../../node_modules/@angular/forms';
import { ValidateFormDirective } from './directives/validate-form.directive';
import { SearchComponent } from './components/search/search.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from './components/filter/filter.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { ReportFilterComponent } from './components/report-filter/report-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [
    PageHeaderComponent,
    ValidateFormDirective,
    SearchComponent,
    FilterComponent,
    DynamicTableComponent,
    ReportFilterComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    ValidateFormDirective,
    SearchComponent,
    NgSelectModule,
    NgbPaginationModule,
    FilterComponent,
    DynamicTableComponent,
    ReportFilterComponent
  ]
})
export class SharedModule { }
