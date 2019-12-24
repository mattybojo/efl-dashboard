import { TestBed } from '@angular/core/testing';

import { TeamPickerService } from './team-picker.service';

describe('TeamPickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamPickerService = TestBed.get(TeamPickerService);
    expect(service).toBeTruthy();
  });
});
