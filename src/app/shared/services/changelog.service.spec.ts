import { TestBed } from '@angular/core/testing';

import { ChangelogService } from './changelog.service';

describe('ChangelogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangelogService = TestBed.get(ChangelogService);
    expect(service).toBeTruthy();
  });
});
