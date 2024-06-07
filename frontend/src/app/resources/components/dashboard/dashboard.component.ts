import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../../../core/authentication/auth.service';
import { TokenStorageService } from '../../../core/services/token/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  implements OnInit {
 

  isLoggedIn = false;

  user = [
    {
      value: 'kivova'
    }
  ];
  userId = null;

  constructor(
    private _token: TokenStorageService,
    private _auth: AuthService
  ) {
    this._auth.user.subscribe((user) => {
      if (user) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    });
  ;



  }

  ngOnInit(): void {

    setTimeout(() => {
          const { user_id, full_name, email } = this._token.getUser();
    this.userId = user_id;
    this.user[0].value = full_name;
    this.user[1].value = email;
    this.user[1].value = email;
    }, 200);

  }



}
