import { TestBed } from '@angular/core/testing';

import { TutowhatService } from './tutowhat.service';

describe('TutowhatService', () => {
  let service: TutowhatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutowhatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
