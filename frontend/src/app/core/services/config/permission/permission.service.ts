import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { BaseService } from '../../interfaces/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseService{
  constructor(httpApi: ApiService) {
    super(httpApi, '/permissions');
}
}
