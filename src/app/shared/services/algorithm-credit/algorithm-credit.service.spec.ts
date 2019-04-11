import { TestBed, inject } from '@angular/core/testing';

import { AlgorithmCreditService } from './algorithm-credit.service';

describe('AlgorithmCreditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlgorithmCreditService]
    });
  });

  it('should be created', inject([AlgorithmCreditService], (service: AlgorithmCreditService) => {
    expect(service).toBeTruthy();
  }));
});
