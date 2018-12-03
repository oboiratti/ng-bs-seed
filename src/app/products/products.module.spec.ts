import { ProductsModule } from './products.module';

describe('ProductModule', () => {
  let productModule: ProductsModule;

  beforeEach(() => {
    productModule = new ProductsModule();
  });

  it('should create an instance', () => {
    expect(productModule).toBeTruthy();
  });
});
