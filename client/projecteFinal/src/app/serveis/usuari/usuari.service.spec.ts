import { TestBed } from '@angular/core/testing';

import { UsuariService } from './usuari.service';

describe('UsuariService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariService = TestBed.get(UsuariService);
    expect(service).toBeTruthy();
  });
});
