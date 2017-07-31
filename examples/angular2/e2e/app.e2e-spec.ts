import { CompanyRegistryNg2Page } from './app.po';

describe('company-registry-ng2 App', () => {
  let page: CompanyRegistryNg2Page;

  beforeEach(() => {
    page = new CompanyRegistryNg2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
