import { TestBed } from '@angular/core/testing';

import { TokenVerificationService } from './token-verification.service';

describe('TokenVerficiationService', () => {
  let service: TokenVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
