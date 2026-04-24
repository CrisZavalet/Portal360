import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichajeEmpleado } from './fichaje-empleado';

describe('FichajeEmpleado', () => {
  let component: FichajeEmpleado;
  let fixture: ComponentFixture<FichajeEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichajeEmpleado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichajeEmpleado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
