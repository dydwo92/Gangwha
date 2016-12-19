import { GangwhaPage } from './app.po';

describe('gangwha App', function() {
  let page: GangwhaPage;

  beforeEach(() => {
    page = new GangwhaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
