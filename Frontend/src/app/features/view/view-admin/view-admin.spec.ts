import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdmin } from './view-admin';

describe('ViewAdmin', () => {
  let component: ViewAdmin;
  let fixture: ComponentFixture<ViewAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
