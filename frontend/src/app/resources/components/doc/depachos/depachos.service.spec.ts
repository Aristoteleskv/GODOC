import { TestBed } from '@angular/core/testing';

import { DepachosService } from './depachos.service';

describe('DepachosService', () => {
  let service: DepachosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepachosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
