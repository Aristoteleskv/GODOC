import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
import { User } from 'src/app/shared/models/users/user';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<any>;

  constructor(private _api: ApiService, private _token: TokenStorageService) {
    this.userSubject = new BehaviorSubject<User>(this._token.getUser());
    this.user = this.userSubject.asObservable();
  }
  
  getUser(): User {
    return this.userSubject.value;
  }
  getCurrentUserRole(): string {
    return sessionStorage.getItem("role");
  }

  getCurrentUserId(): string {
    return sessionStorage.getItem("user_id");
  }

  getCurrentUserUsername(): string {
    return sessionStorage.getItem("username");
  }

  getCurrentUserPermissions(): string[] {
    const permissions = sessionStorage.getItem("permissions");
    if (permissions) {
      return JSON.parse(permissions);
    } else {
      // Retorne um array vazio ou algum valor padrão se "permissions" não estiver definido
      return [];
    }
  }

  getCurrentUserModulos(): string[] {
    return JSON.parse(sessionStorage.getItem("modulos"));
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }

  checkAuth() {
    if (this._token.getToken()) {
      this._token.getUser().subscribe(
        (data: any) => {
          this.setAuth(data);
        },
        (err) => {
          this.logout();
        }
      );
    } else {
      this.logout();
    }
  }
  setAuth(user: any) {
    if (user.role) sessionStorage.setItem("role", user.role);
    if (user.username) sessionStorage.setItem("username", user.username);
    if (user.user_id) sessionStorage.setItem("id", user.id);
    if (user.permissions)
    sessionStorage.setItem("permissions", JSON.stringify(user.permissions));
     // Configurar o token e os dados do usuário no serviço de token
     this._token.setToken(user.token);
     this._token.setUser(user);

     // Atualizar o estado do usuário no serviço de autenticação
     this.userSubject.next(user);
  }
  setAuths(user: any) {
    // Verificar se o objeto 'user' contém as propriedades necessárias
    if (!user || !user.token || !user.username || !user.role) {
      console.error('Dados de usuário inválidos fornecidos para setAuth');
      return;
    }

    // Armazenar informações do usuário de forma segura
    try {
      sessionStorage.setItem("role", user.role);
      sessionStorage.setItem("username", user.username);
      sessionStorage.setItem("user_id", user.user_id.toString());
      sessionStorage.setItem("permissions", JSON.stringify(user.permissions || []));

      // Configurar o token e os dados do usuário no serviço de token
      this._token.setToken(user.token);
      this._token.setUser(user);

      // Atualizar o estado do usuário no serviço de autenticação
      this.userSubject.next(user);
    } catch (e) {
      console.error('Erro ao configurar a sessão do usuário:', e);
    }
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this._api
      .postTypeRequestl('auth/login', credentials, httpOptions)
      .pipe(
        map((user: User) => {
          return user;
        })
      );
  }



  register(user: any): Observable<any> {
    return this._api.postTypeRequest('auth/register', {
      fullName: user.fullName,
      telefone: user.telefone,
      email: user.email,
      password: user.password,
    });
  }



  logout() {
    this._token.clearStorage();
    this.userSubject.next(null);
    sessionStorage.clear();
    window.localStorage.clear();
    // window.location.reload() // Descomente se precisar recarregar a aplicação
  }



  // GET NEXT 1 HOUR
  private get expireTime1Hour() {
    const dNow = new Date();
    let dTime = dNow.getTime();
    dTime += 3600 * 1000;
    dNow.setTime(dTime);
    return dNow;
  }
}
