import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { User } from 'src/app/shared/models/users/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: User = {
    email: '',
    password: '',
    full_name: '',
    telefone: 1,
    role: '',
    active: false,
    user_id: 0,
    username: ''
  };

  confirmPassword = '';
  errorMessage = '';
  loading = false;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.errorMessage = '';
    if (this.user.full_name && this.user.telefone && this.user.password && this.user.email && this.confirmPassword) {
      if (this.user.password !== this.confirmPassword) {
        this.errorMessage = 'As senhas precisam corresponder';
      } else {
        this.loading = true;
        this._auth
          .register({
            fullName: this.user.full_name,
            telefone: this.user.telefone,
            email: this.user.email,
            password: this.user.password,
          })
          .subscribe(
            (res) => {
              console.log(res);
              this.loading = false;
              this._router.navigate(['/login']);
            },
            (err) => {
              this.errorMessage = err.error.message;
              this.loading = false;
            }
          );
      }
    } else {
      this.errorMessage = 'Certifique-se de preencher tudo ;)';
    }
  }

  canSubmit(): boolean {
    return this.user.full_name && this.user.telefone && this.user.email && this.user.password && this.confirmPassword
      ? true
      : false;
  }
}
