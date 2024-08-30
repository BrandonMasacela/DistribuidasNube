/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CursoUsuarioService } from './curso-usuario.service';

describe('Service: CursoUsuario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CursoUsuarioService]
    });
  });

  it('should ...', inject([CursoUsuarioService], (service: CursoUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
