import { TestBed, inject } from '@angular/core/testing';

import { ProfileGuardService } from './profile-guard.service';

describe('ProfileGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileGuardService]
    });
  });

  it('should be created', inject([ProfileGuardService], (service: ProfileGuardService) => {
    expect(service).toBeTruthy();
  }));
});
