import { TestBed } from '@angular/core/testing';

import { TeacherLogService } from './teacher-log.service';

describe('TeacherLogService', () => {
  let service: TeacherLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
