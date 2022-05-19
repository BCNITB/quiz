import { TestBed } from '@angular/core/testing';

import { LanguageConfigService } from './language-config.service';

describe('LanguageConfigService', () => {
  let service: LanguageConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
