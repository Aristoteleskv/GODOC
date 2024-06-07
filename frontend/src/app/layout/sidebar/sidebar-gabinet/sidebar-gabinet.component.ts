import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../core/authentication/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { User } from '../../../shared/models/users/user';

@Component({
  selector: 'app-sidebar-gabinet',
  templateUrl: './sidebar-gabinet.component.html',
  styleUrls: ['./sidebar-gabinet.component.scss']
})
export class SidebarGabinetComponent implements OnInit {

  isLoggedIn = false;
  cartData: any;
  user:User;




  constructor(
    private _auth: AuthService,
    private _cart: CartService
  ) {
    this._auth.user.subscribe((user) => {
      if (user) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    });
    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
    });
  }


  ngOnInit(): void {


  }

}
