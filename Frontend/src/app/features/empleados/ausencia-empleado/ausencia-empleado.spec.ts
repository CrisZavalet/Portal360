import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AusenciaEmpleado } from './ausencia-empleado';

describe('AusenciaEmpleado', () => {
  let component: AusenciaEmpleado;
  let fixture: ComponentFixture<AusenciaEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AusenciaEmpleado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AusenciaEmpleado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
