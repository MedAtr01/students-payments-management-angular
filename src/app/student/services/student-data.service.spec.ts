import {TestBed} from '@angular/core/testing';

import {StudentDataService} from './student-data.service';

describe('StdudentDataService', () => {
  let service: StudentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
