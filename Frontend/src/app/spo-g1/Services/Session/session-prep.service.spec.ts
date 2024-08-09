import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {SessionPreperationService} from './session-prep.service';

import { expect } from 'chai'; // Importez Chai ici

describe('SessionPreperationService', () => {
  let service: SessionPreperationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionPreperationService],
    });

    service = TestBed.inject(SessionPreperationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).to.be.an('object');
    expect(service).to.have.property('addSession');
  });

  it('should add session correctly', () => {
    const mockSession = { id: '123', name: 'Test Session' };

    service.addSession(mockSession).subscribe(response => {
      expect(response).to.deep.equal(mockSession);
    });

    const req = httpMock.expectOne(`${service.BasedUrl}/add_Session`);
    expect(req.request.method).to.equal('POST');
    req.flush(mockSession);
  });
});
