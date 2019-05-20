import { TestBed } from '@angular/core/testing';

import { TascaService } from './tasca.service';

describe('TascaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TascaService = TestBed.get(TascaService);
    expect(service).toBeTruthy();
  });
});
