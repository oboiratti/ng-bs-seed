import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { ValidateFormDirective } from './directives/validate-form.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    PageHeaderComponent,
    ValidateFormDirective
  ],
  exports: [
    PageHeaderComponent,
    ValidateFormDirective
  ]
})
export class SharedModule { }
