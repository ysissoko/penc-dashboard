import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';

// Ng-ApexCharts

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { JsonFormModule } from '../../../shared/components/json-form/json-form.module';
import { TablePageComponent } from './table-page.component';

@NgModule({
  declarations: [TablePageComponent],
  exports: [TablePageComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgxDatatableModule,
    JsonFormModule
  ]
})
export class TablePageModule { }
