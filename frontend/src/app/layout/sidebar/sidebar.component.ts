import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AuthService } from '../../core/authentication/auth.service';
import { CartService } from '../../core/services/cart.service';
import { ModuleService } from '../../core/services/module/module.service';
import { TokenStorageService } from '../../core/services/token/token-storage.service';
import { UserService } from '../../core/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  screenHeight: any;
  screenWidth: any;
  isMobile = false;
  dropdownVisible = false;
  user: any;

  role: string;
  permissions: string[];
  @Input() isMenuOpen: boolean;
  modulo: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.screenWidth > 768) this.isMobile = false;
    else this.isMobile = true;
  }



  constructor(
    private _auth: TokenStorageService,
    private authService: AuthService  ) {
    this.getScreenSize();

  }


  ngOnInit(): void {
    this.role = this._auth.getCurrentUserRole();
    this.permissions = this._auth.getCurrentUserPermissions();
    this.authService.user.subscribe({
      next: (data) => {
        if (data && data.data && Object.keys(data.data).length !== 0) {
          this.user = data.data; // Agora 'currentUser' terá os dados do usuário, como 'nome', 'username', etc.

        }
        if (data && data.data.modulo && Object.keys(data.data.modulo).length !== 0) {
          this.modulo = data.data.modulo; // Agora 'currentUser' terá os dados do usuário, como 'nome', 'username', etc.

        }
    },
      error: error => {
        return error;
      }
  });

  }





  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}

