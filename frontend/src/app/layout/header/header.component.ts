import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
 import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;
  isMenuOpen = false;
  isMobile = false;
  isLoggedIn = false;
  dropdownVisible = false; 
  currentUser: any;
  role: string;
  permissions: string[];

  constructor(
    private _notification: NzNotificationService,
    private _token: TokenStorageService,
    private router: Router,
    private _auth: AuthService,
  ) {

          this._auth.user.subscribe((user) => {
      if (user) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    });



  }


  ngOnInit(): void {
    this.role = this._token.getCurrentUserRole();
    this.permissions = this._token.getCurrentUserPermissions();
    this._auth.user.subscribe({
      next: (data) => {
        if (data && data.data && Object.keys(data.data).length !== 0) {
          this.currentUser = data.data; // Agora 'currentUser' terá os dados do usuário, como 'nome', 'username', etc.
        }
    },
      error: error => {
        return error;
      }
  });

  }


  toggleMenu() {
    const bool = this.isMenuOpen;
    if (bool === false) {
      this.isMenuOpen = true;
    } else {
      this.isMenuOpen = false;
    }
  }


  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout() {
    this.router.navigate(['goe/login']);
    this._notification.info(
      'Volte sempre',
      'sucesso'
    );
    this._auth.logout();
  }
}
