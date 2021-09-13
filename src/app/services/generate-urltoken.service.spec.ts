import { TestBed } from '@angular/core/testing';

import { GenerateURLtokenService } from './generate-urltoken.service';

describe('GenerateURLtokenService', () => {
  let service: GenerateURLtokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateURLtokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
