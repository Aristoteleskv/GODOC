import { TestBed } from '@angular/core/testing';

import { PermissinsService } from './permissins.service';

describe('PermissinsService', () => {
  let service: PermissinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
