import { Component, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { ProductCategoryService } from '../../../services/product-category/product-category.service';
import { ProductSubCategoryService } from '../../../services/product-category/product-subcategory.service';
import { JsonFormData } from '../../../shared/components/json-form/json-form.component';

@Component({
  selector: 'app-product-subcategory-page',
  templateUrl: './product-subcategory-page.component.html',
  styleUrls: ['./product-subcategory-page.component.scss'],
})
export class ProductSubCategoryPageComponent implements OnInit {

  jsonFormData: JsonFormData;

  columns: TableColumn[] = [
    {
      name: "Id",
      prop: "id"
    }, {
      name: "Nom",
      prop: "name"
    },
    {
      name: "Category",
      prop: "category.id",
    }]

  constructor(public productSubCatService: ProductSubCategoryService, private productCatService: ProductCategoryService) { }

  ngOnInit() {
    this.productCatService.all().subscribe((categories: any) => {
      this.jsonFormData = {
        controls: [{
          name: "name",
          label: "Nom de la sous-catégorie",
          value: "",
          type: "text",
          placeholder: "Entrer le nom de la sous catégorie",
          validators: [{ name: 'required' }]
        },
        {
          name: "category",
          label: "Catégorie principale",
          value: "",
          type: "select",
          placeholder: "Sélectionner la catégorie",
          validators: [{ name: 'required' }],
          options: categories.map((cat: any) => ({ value: cat.id, name: cat.name }))
        }],
        currentId: null
      }
    })

  }

  tranformDtoFn(value: any) {
    console.log(value)
    return { ...value, category: { id: Number(value.category) } };
  }
}
