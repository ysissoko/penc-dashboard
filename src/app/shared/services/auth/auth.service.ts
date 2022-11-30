import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserService } from '../user/user.service';
import firebase from 'firebase/compat/app'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(private auth:AngularFireAuth,private permsService:NgxPermissionsService, private uService:UserService) { 
    this.auth.authState.subscribe((user: firebase.User | null) => {
      if (user) {
          this.uService.find({
            uid : user?.uid
          }).subscribe({
            next : (_users:any) => {
              this.user = _users[0];
              this.permsService.loadPermissions(["ADMIN"]);
            },
            error: console.error
          })
      }
    });
  }

  signOut(){
    this.auth.signOut();
  }
}
