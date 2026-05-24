import { TestBed } from '@angular/core/testing';

import { ServizioSaldo } from './servizio-saldo';

describe('ServizioSaldo', () => {
  let service: ServizioSaldo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServizioSaldo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
