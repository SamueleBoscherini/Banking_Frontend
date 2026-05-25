import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tranfser } from './tranfser';

describe('Tranfser', () => {
  let component: Tranfser;
  let fixture: ComponentFixture<Tranfser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tranfser],
    }).compileComponents();

    fixture = TestBed.createComponent(Tranfser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
