class DouPage {
  get salariesLink() {
    return $('a[href="https://jobs.dou.ua/salaries/"]');
  }
  get salariesHeader() {
    return $("h4.dws-block-header");
  }
  get workLink() {
    return $('a[href="https://jobs.dou.ua/"]');
  }
  get searchButton() {
    return $("input.dui-button.btn-search");
  }
  get quickNavSection() {
    return $("div.example");
  }
  get defTechLink() {
    return $('a[href*="deftech"]');
  }
  get popularForumLink() {
    return $('a[href*="Defence%20tech"]');
  }
  get discussingNowSection() {
    return $("*=Обговорюють зараз");
  }

  async open() {
    await browser.url("https://jobs.dou.ua/");
  }

  async clickSalaries() {
    await this.salariesLink.waitForDisplayed({ timeout: 5000 });
    await this.salariesLink.click();
  }

  async clickWork() {
    await this.workLink.waitForDisplayed({ timeout: 5000 });
    await this.workLink.click();
  }

  async clickSearch() {
    await this.searchButton.waitForDisplayed({ timeout: 5000 });
    await this.searchButton.click();
  }

  async clickDefTech() {
    await this.defTechLink.waitForDisplayed({ timeout: 5000 });
    await this.defTechLink.click();
  }
}

export default new DouPage();
