import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Converts } from './converts';

describe('Converts', () => {
  let component: Converts;
  let fixture: ComponentFixture<Converts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Converts],
    }).compileComponents();

    fixture = TestBed.createComponent(Converts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
