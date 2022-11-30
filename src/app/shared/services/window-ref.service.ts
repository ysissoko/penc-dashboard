import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  get ref(){
    return window;
  }

  static previous(){
    window.history.back();
  }
}
