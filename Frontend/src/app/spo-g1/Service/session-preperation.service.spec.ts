import { TestBed } from '@angular/core/testing';

import { SessionPreperationService } from './session-preperation.service';

describe('SessionPreperationService', () => {
  let service: SessionPreperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionPreperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
