import { TestBed } from '@angular/core/testing';

import { GestorErrorsService } from './gestor-errors.service';

describe('GestorErrorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestorErrorsService = TestBed.get(GestorErrorsService);
    expect(service).toBeTruthy();
  });
});
