import { Component } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { ProductCategoryService } from '../../../services/product-category/product-category.service';
import { JsonFormData } from '../../../shared/components/json-form/json-form.component';

@Component({
  selector: 'app-product-category-page',
  templateUrl: './product-category-page.component.html',
  styleUrls: ['./product-category-page.component.scss'],
})
export class ProductCategoryPageComponent {

  jsonFormData: JsonFormData = {
    controls: [
      {
        name: "photo",
        label: "Photo de la catégorie",
        value: "",
        type: "file",
        placeholder: "Ajouter une photo pour la catégorie",
        validators: [{ name: 'required' }],
        uploadUrl: 'photo/product-category/upload'
      },
      {
        name: "name",
        label: "Nom de la catégorie",
        value: "",
        type: "text",
        placeholder: "Entrer le nom de la catégorie",
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

  constructor(public service: ProductCategoryService) { }
}
