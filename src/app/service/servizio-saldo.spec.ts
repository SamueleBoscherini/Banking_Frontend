import { TestBed } from '@angular/core/testing';

import { ServizioSalod } from './servizio-saldo';

describe('ServizioSalod', () => {
  let service: ServizioSalod;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServizioSalod);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
