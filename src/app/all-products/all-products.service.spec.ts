import { TestBed } from '@angular/core/testing';



describe('AllProductsService', () => {
  let service: AllProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
