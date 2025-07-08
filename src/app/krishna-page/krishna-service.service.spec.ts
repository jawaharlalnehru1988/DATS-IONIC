import { TestBed } from '@angular/core/testing';

import { KrishnaServiceService } from './krishna-service.service';

describe('KrishnaServiceService', () => {
  let service: KrishnaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KrishnaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
