import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../core/services/user/user.service';
import { AuthService } from '../core/authentication/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  screenHeight: any;
  screenWidth: any;
  isMenuOpen = false;
  isMobile = false;
  user: any;
  colorScheme: string;
  constructor(
    private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.user.subscribe({
      next: (data) => {
        if (data && data.data.modulo && Object.keys(data.data.modulo).length !== 0) {
          this.user = data.data.modulo; // Agora 'currentUser' terá os dados do usuário, como 'nome', 'username', etc.

        }
    },
      error: error => {
        return error;
      }
  });
 this.colorScheme = this.getColorScheme();
    document.documentElement.className = this.colorScheme;

   }


    // Método para alternar o esquema de cores e salvar a preferência do usuário
toggleColorScheme() {
  this.colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark';
  // Atualiza o esquema de cores no localStorage
  window.localStorage.setItem('colorScheme', this.colorScheme);
  // Atualiza a classe do elemento raiz
  document.documentElement.className = this.colorScheme;
}

// Método para obter a preferência de esquema de cores salva do usuário
getColorScheme(): string {
  // Tenta obter a preferência do esquema de cores do localStorage
  const savedScheme = window.localStorage.getItem('colorScheme');
  // Se uma preferência foi salva, retorna ela, senão, retorna a preferência do sistema
  return savedScheme ? savedScheme : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}


  toggleState() {
    const bool = this.isMenuOpen;
    if (bool === false) {
      this.isMenuOpen = true;
    } else {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


}
