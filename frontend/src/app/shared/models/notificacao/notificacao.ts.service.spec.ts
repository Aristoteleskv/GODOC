import { TestBed } from '@angular/core/testing';

import { NotificacaoTsService } from './notificacao.ts.service';

describe('NotificacaoTsService', () => {
  let service: NotificacaoTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacaoTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
