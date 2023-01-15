import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ShopCategoryService extends BaseService{

  constructor(_http:HttpClient) { 
    super(_http,"shop-category")
  }
}
