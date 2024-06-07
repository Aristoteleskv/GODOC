import { TestBed } from '@angular/core/testing';

import { SecuryService } from './secury.service';

describe('SecuryService', () => {
  let service: SecuryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
