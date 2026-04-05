class GitHubPage {
  get pageTitle() {
    return browser.getTitle();
  }
  get loginField() {
    return $("#login_field");
  }
  get passwordField() {
    return $("#password");
  }
  get signInButton() {
    return $('[name="commit"]');
  }
  get flashError() {
    return $(".flash-error");
  }
  get emailInput() {
    return $("#email");
  }
  get continueButton() {
    return $("button*=Continue");
  }
  get signupEmailInput() {
    return $('input[type="email"]');
  }
  get countryDropdown() {
    return $('select[name="country"]');
  }
  get marketingCheckbox() {
    return $('[name="marketing_email_opt_in"]');
  }
  get submitButton() {
    return $('button[type="submit"][data-analytics-event*="subscribe"]');
  }
  get newsletterTitle() {
    return $("h1*=Get our developer newsletter");
  }
  get thankYouTitle() {
    return $("#hero-section-brand-heading");
  }
  get customerStoryCard() {
    return $("a.customer-story-card");
  }
  get pricingLink() {
    return $('a[href="/pricing"]');
  }
  get copilotTitle() {
    return $("*=Try the Copilot-powered platform");
  }
  get compareAllFeaturesLink() {
    return $("*=Compare all features");
  }
  get compareFeaturesTitle() {
    return $("*=Compare features");
  }
  get searchInput() {
    return $('input[name="q"], [data-target="qbsearch-input.inputButton"]');
  }
  get searchBox() {
    return $(
      'input[data-testid="site-search-input"], input[name="query-builder-test"]',
    );
  }

  async open() {
    await browser.url("https://github.com/");
  }

  async openLogin() {
    await browser.url("https://github.com/login");
  }

  async openSignup() {
    await browser.url("https://github.com/signup");
  }

  async openNewsletter() {
    await browser.url("https://github.com/newsletter");
  }

  async openCustomerStories() {
    await browser.url("https://github.com/customer-stories");
  }

  async openExplore() {
    await browser.url("https://github.com/explore");
  }

  async openSearch(query) {
    await browser.url(`https://github.com/search?q=${query}&type=repositories`);
  }

  async login(username, password) {
    await this.loginField.setValue(username);
    await this.passwordField.setValue(password);
    await this.signInButton.click();
  }

  async fillSignupEmail(email) {
    await this.emailInput.waitForDisplayed({ timeout: 5000 });
    await this.emailInput.setValue(email);
    await this.continueButton.waitForDisplayed({ timeout: 5000 });
    await this.continueButton.click();
  }

  async fillNewsletterForm(email, country) {
    await this.signupEmailInput.waitForDisplayed({ timeout: 5000 });
    await this.signupEmailInput.setValue(email);
    await this.countryDropdown.waitForDisplayed({ timeout: 5000 });
    await this.countryDropdown.selectByVisibleText(country);
    await browser.execute("window.scrollBy(0, 500)");
    await browser.pause(500);
    const checkbox = await this.marketingCheckbox;
    await checkbox.scrollIntoView();
    await browser.pause(500);
    const checkboxWrapper = await $(
      '[name="marketing_email_opt_in"]',
    ).parentElement();
    await checkboxWrapper.scrollIntoView();
    await checkboxWrapper.click();
    await this.submitButton.scrollIntoView();
    await this.submitButton.waitForDisplayed({ timeout: 5000 });
    await this.submitButton.click();
  }

  async searchFor(query) {
    await this.searchInput.waitForDisplayed({ timeout: 5000 });
    await this.searchInput.click();
    await this.searchBox.waitForDisplayed({ timeout: 5000 });
    await this.searchBox.setValue(query);
    await browser.keys("Enter");
  }

  async clickPricing() {
    await this.pricingLink.waitForDisplayed({ timeout: 5000 });
    await this.pricingLink.click();
  }

  async clickCompareAllFeatures() {
    await this.compareAllFeaturesLink.scrollIntoView();
    await this.compareAllFeaturesLink.waitForDisplayed({ timeout: 5000 });
    await this.compareAllFeaturesLink.click();
  }
}
export default new GitHubPage();
