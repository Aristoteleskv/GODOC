import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TransferChange, TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
 
  constructor() {
    /*this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      return this.attachmentList.push(JSON.parse(response));
    };*/
    // username login authentication

  }
  ngOnInit(): void {

  }


}
