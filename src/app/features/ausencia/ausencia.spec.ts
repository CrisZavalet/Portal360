import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ausencia } from './ausencia';

describe('Ausencia', () => {
  let component: Ausencia;
  let fixture: ComponentFixture<Ausencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ausencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ausencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
