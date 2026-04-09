import { TestBed } from '@angular/core/testing';

import { WorkTime } from './work-time';

describe('WorkTime', () => {
  let service: WorkTime;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkTime);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
