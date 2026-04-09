import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nomina } from './nomina';

describe('Nomina', () => {
  let component: Nomina;
  let fixture: ComponentFixture<Nomina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nomina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nomina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
