import { TestBed } from '@angular/core/testing';

import { IonAlertService } from './ion-alert.service';

describe('IonAlertService', () => {
  let service: IonAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
