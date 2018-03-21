import { TestBed, inject } from '@angular/core/testing';

import { MyApiService } from './my-api.service';

describe('MyApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyApiService]
    });
  });

  it('should be created', inject([MyApiService], (service: MyApiService) => {
    expect(service).toBeTruthy();
  }));
});
