import { TestBed } from '@angular/core/testing';

import { TutowhyService } from './tutowhy.service';

describe('TutowhyService', () => {
  let service: TutowhyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutowhyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
