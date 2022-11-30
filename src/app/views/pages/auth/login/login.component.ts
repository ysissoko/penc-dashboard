import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;

  constructor(private router: Router, private route: ActivatedRoute, private _auth:AngularFireAuth) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(credential:{email:string,password:string}) {
    const {email, password} = credential;
    this._auth.signInWithEmailAndPassword(email,password).then((value) => {
      this.router.navigate([this.returnUrl]);
    })
  }

}
