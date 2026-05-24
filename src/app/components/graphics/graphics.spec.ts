import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Graphics } from './graphics';
import { ServizioSaldo } from '../../service/servizio-saldo';
import { of } from 'rxjs';

describe('Graphics', () => {
  let component: Graphics;
  let fixture: ComponentFixture<Graphics>;

  beforeEach(async () => {
    const mockService = {
      getAccountId: () => 1,
      getTransactions: () => of({ transactions: [] }),
      getAccount: () => ({ currency: 'EUR' }),
    };

    await TestBed.configureTestingModule({
      imports: [Graphics],
      providers: [{ provide: ServizioSaldo, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Graphics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
