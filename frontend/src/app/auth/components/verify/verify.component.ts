import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
import { Verifica } from 'src/app/shared/models/verifica/verifica';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  verify: Verifica = {
    codigo_verify: 244,
    codigo: 1232,
  }

  user = [
    {
      key: 'nome',
      label: 'nome',
      value: '',
      type: 'text',
    },
    {
      key: 'codigo',
      label: 'codigo',
      value: '',
      type: 'text',
    },
    {
      key: 'codigo_verify',
      label: 'codigo_verify',
      value: '',
      type: 'text',
    }
  ];

  errorMessage = '';
  loading = false;
  userId = null;
  alertMessage = '';
  alertType = "";
  alertVisible = false;


  constructor(private api: AuthService,
    private _api: ApiService,
    private _token: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    const { user_id, full_name, codigo, telefone, codigo_verify } = this._token.getUser();
    this.userId = user_id;
    this.user[0].value = full_name;
    this.user[1].value = codigo;
    this.user[2].value = telefone;
    this.user[3].value = codigo_verify;
    console.log(this.user);
  }

    // Submit data to be updated
    onSubmit(): void {
      this.alertVisible = false;
      if (this.user[1].value !== this.user[3].value) {
        this.alertType = 'erro';
        this.alertMessage = 'Codigo Invalido!';
        this.alertVisible = true;
      } else {
        this.loading = true;
        this._api
          .putTypeRequest(`verify/${this.userId}`, {
            codigo_verify: this.user[3].value,
          })
          .subscribe(
            (res: any) => {
              console.log(res);
              this.alertMessage = res.message;
              this.alertType = 'success';
              this.alertVisible = true;
              this.loading = false;
              const oldDetails = this._token.getUser();
              this._token.setUser({
                ...oldDetails,
                codigo_verify: this.user[2].value,
              });

               window.location.reload();
            },
            (err: any) => {
              console.log(err);
              this.alertMessage = err.error.message;
              this.alertVisible = true;
              this.alertType = 'error';
              this.loading = false;
            }
          );
      }
    }

  mascaraNumero(_numero: string) {
    var marcara = ""
    if (_numero) {
      for (let i = 1; i < _numero.length -2; i++) {
        marcara += "x";
      }
      //return marcara + _numero.slice(10,12);
    }else{

    }
  }

  verifyNumero(): void {
    this._api.verify(this.verify).subscribe(
      res=>{
        this._api.verify(this.verify);
      },
      err=> console.log(err)
      );
  }
}
