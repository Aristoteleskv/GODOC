import { TestBed } from '@angular/core/testing';

import { HasRoleService } from './has-role.service';

describe('HasRoleService', () => {
  let service: HasRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HasRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
