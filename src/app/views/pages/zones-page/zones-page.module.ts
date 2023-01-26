import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { JsonFormModule } from '../../../shared/components/json-form/json-form.module';
import { TablePageModule } from '../table/table-page.module';
import { ZonesPageComponent } from './zones-page.component';

const routes: Routes = [
  {
    path: '',
    component: ZonesPageComponent
  }
]

@NgModule({
  declarations: [ZonesPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbDropdownModule,
    NgxDatatableModule,
    JsonFormModule,
    TablePageModule
  ]
})
export class ZonesPageModule { }
