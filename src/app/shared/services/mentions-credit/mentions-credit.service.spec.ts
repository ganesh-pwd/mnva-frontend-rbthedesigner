import { TestBed, inject } from '@angular/core/testing';

import { MentionsCreditService } from './mentions-credit.service';

describe('MentionsCreditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MentionsCreditService]
    });
  });

  it('should be created', inject([MentionsCreditService], (service: MentionsCreditService) => {
    expect(service).toBeTruthy();
  }));
});
