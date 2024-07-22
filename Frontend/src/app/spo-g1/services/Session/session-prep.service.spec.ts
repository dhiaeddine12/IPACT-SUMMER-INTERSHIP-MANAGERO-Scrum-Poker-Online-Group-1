import { TestBed } from '@angular/core/testing';

import { SessionPrepService } from './session-prep.service';

describe('SessionPrepService', () => {
  let service: SessionPrepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionPrepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
