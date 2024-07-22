import { TestBed } from '@angular/core/testing';

import { WhytutoService } from './whytuto.service';

describe('WhytutoService', () => {
  let service: WhytutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhytutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
