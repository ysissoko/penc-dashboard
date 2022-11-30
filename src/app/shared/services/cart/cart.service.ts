import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService{
  items : any[] = [];

  constructor(_http: HttpClient, auth: AngularFireAuth, private _toastrService:ToastrService) { 
    super(_http,'cart');
    auth.authState.subscribe(() => {
      this.updateCart();
    })
  }

  updateCart() {
    this.myCart().subscribe({
      next : (cartItems:any) => {
        this.items = cartItems;
      },
      error : () => this._toastrService.error(`Une erreur est survenue lors de la mise à jour`)
    })
  }

  addItemToCart(product:any,options:any[]=[]){
    // TODO: add options
    this.add({product, shopId: product.shop.id, options}).subscribe({
      next : (items:any) => {
        this.items = items;
        this._toastrService.success(`vous avez ajouté ${product.name} à votre panier`);
      },
      error : () => this._toastrService.error(`Une erreur est survenue lors de l'ajout au panier`)
    });
  }

  myCart(){
    return this.http.get(`${environment.BASE_URL}/${this.endpoint}`);
  }

  count(){
    return this.items.reduce((prev, curr) => prev + curr.quantity, 0);
  }

  get total$(): Observable<number> {
    return this.http.get<number>(`${environment.BASE_URL}/${this.endpoint}/total`);
  }

  removeItem(id: number) {
    const obs = this.http.delete(`${environment.BASE_URL}/${this.endpoint}/products/${id}`)
    obs.subscribe({
      next : (items: any) => {
        this.items = items;
      },
      error : console.error
    })
    return obs;
  }

  checkout() {
    return this.http.post(`${environment.BASE_URL}/order/create`, {});
  }
}
