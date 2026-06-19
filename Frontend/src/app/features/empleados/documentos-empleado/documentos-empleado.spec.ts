import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosEmpleado } from './documentos-empleado';

describe('DocumentosEmpleado', () => {
  let component: DocumentosEmpleado;
  let fixture: ComponentFixture<DocumentosEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosEmpleado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosEmpleado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
