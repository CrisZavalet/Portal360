import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTime } from './view-time';

describe('ViewTime', () => {
  let component: ViewTime;
  let fixture: ComponentFixture<ViewTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
