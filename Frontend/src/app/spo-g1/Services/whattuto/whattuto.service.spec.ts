import { TestBed } from '@angular/core/testing';

import { WhattutoService } from './whattuto.service';

describe('WhattutoService', () => {
  let service: WhattutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhattutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
