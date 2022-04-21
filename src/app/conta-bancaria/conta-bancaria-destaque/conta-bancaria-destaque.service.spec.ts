import { TestBed } from '@angular/core/testing';

import { ContaBancariaDestaqueService } from '../conta-bancaria-destaque.service';

describe('DestaqueService', () => {
  let service: ContaBancariaDestaqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaBancariaDestaqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});