import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWeb } from './login-web';

describe('LoginWeb', () => {
  let component: LoginWeb;
  let fixture: ComponentFixture<LoginWeb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginWeb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWeb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
