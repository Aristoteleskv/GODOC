import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-dashboard-recepcao',
  templateUrl: './dashboard-recepcao.component.html',
  styleUrls: ['./dashboard-recepcao.component.scss']
})
export class DashboardRecepcaoComponent implements OnInit {
  title="RECEPÇÃO"


  isLoggedIn = false;

  user = [];
  userId = null;
  User: any;

  constructor(
    private _token: TokenStorageService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.authService.user.subscribe((user) => {
      if (user) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    });
  ;



  }

  ngOnInit(): void {

    setTimeout(() => {

      this.authService.user.subscribe({
        next: (data) => {
          if (data && data.data && Object.keys(data.data).length !== 0) {
            this.User = data.data; // Agora 'currentUser' terá os dados do usuário, como 'nome', 'username', etc.
          }
      },
        error: error => {
          return error;
        }
    });
    }, 200);

  }



}
