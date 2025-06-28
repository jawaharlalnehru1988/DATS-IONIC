import { TestBed } from '@angular/core/testing';

import { MusicDetailsService } from './music-details.service';

describe('MusicDetailsService', () => {
  let service: MusicDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
