import { TestBed, inject } from '@angular/core/testing';
import { HistoricalService } from './historical.service';

describe('HistoricalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoricalService]
    });
  });

  it('should be created', inject([HistoricalService], (service: HistoricalService) => {
    expect(service).toBeTruthy();
  }));
});
