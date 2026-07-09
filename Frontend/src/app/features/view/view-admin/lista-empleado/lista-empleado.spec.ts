import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmpleado } from './lista-empleado';

describe('ListaEmpleado', () => {
  let component: ListaEmpleado;
  let fixture: ComponentFixture<ListaEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEmpleado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEmpleado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
