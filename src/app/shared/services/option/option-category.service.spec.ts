import { TestBed } from '@angular/core/testing';

import { OptionCategoryService } from './option-category.service';

describe('OptionCategoryService', () => {
  let service: OptionCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
