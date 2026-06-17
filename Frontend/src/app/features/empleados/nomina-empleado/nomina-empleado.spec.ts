import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominaEmpleado } from './nomina-empleado';

describe('NominaEmpleado', () => {
  let component: NominaEmpleado;
  let fixture: ComponentFixture<NominaEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NominaEmpleado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominaEmpleado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
