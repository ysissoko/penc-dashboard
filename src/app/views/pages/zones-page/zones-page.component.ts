import { Component } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { ZoneService } from '../../../services/zone/zone.service';
import { JsonFormData } from '../../../shared/components/json-form/json-form.component';

@Component({
  selector: 'app-product-subcategory-page',
  templateUrl: './zones-page.component.html',
  styleUrls: ['./zones-page.component.scss'],
})
export class ZonesPageComponent {

  jsonFormData: JsonFormData = {
    controls: [{
      name: "name",
      label: "Nom de la zone",
      value: "",
      type: "text",
      placeholder: "Entrer le nom de la zone",
      validators: [{ name: 'required' }]
    }],
    currentId: null
  }

  columns: TableColumn[] = [
    {
      name: "Id",
      prop: "id"
    }, {
      name: "Nom",
      prop: "name"
    }]

  constructor(public productSubCatService: ZoneService) { }

}
