import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  email?: string
  passwordVisible = false
  password?: string
  error = '';
  loading = false;
  result: any;
  roles: string[] = [];
  isLoggedIn = false;
  showPassword: Boolean;
  colorScheme: string;
  constructor(
    private _notification: NzNotificationService,
    private _token: TokenStorageService,
    private _auth: AuthService,
    private _router: Router ) {

  }

  ngOnInit(): void {
    setTimeout(() => {
    if (this._token.getUser())
    this.isLoggedIn = true;
    this.roles = this._token.getUser();
    this.result = this._token.getUser();
    }, 100);
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

  canSubmit(): boolean {
  return !!this.email && !!this.password;
}

onSubmit(): void {
  if (!this.canSubmit) {
    this.error = 'Por favor, preencha todos os campos.';
    return;
  }

  this.loading = true;
  this._auth.login({ email: this.email, password: this.password }).subscribe({
    next: (user) => {
      this._auth.setAuth(user);
      this._router.navigate(['']);
      this._notification.create('success', 'Bem vindo!', `Olá ${user.email}!`);
      this.loading = false;
    },
    error: (err) => {
      this.error = err.error.message || 'Erro ao tentar fazer login. Por favor, verifique suas credenciais e tente novamente.';
      this._notification.create('error', 'Erro de Login', this.error);
      this.loading = false;
    },
  });
}
}
