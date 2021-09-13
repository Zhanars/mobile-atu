import { TestBed } from '@angular/core/testing';

import { SendServiceDataService } from './send-service-data.service';

describe('SendServiceDataService', () => {
  let service: SendServiceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendServiceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
