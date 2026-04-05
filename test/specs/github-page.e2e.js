import GitHubPage from "../page-objects/github-page.js";

describe("Testing GitHub pages", () => {
  it("should load the homepage and check the title", async () => {
    await GitHubPage.open();

    const title = await GitHubPage.pageTitle;
    console.log("Page title:", title);
    expect(title).toContain("GitHub");
  });

  it("should navigate to login page", async () => {
    await GitHubPage.openLogin();

    const url = await browser.getUrl();
    console.log("Current URL:", url);
    expect(url).toContain("/login");
  });

  it("should show error on invalid login", async () => {
    await GitHubPage.openLogin();
    await GitHubPage.login("invaliduser123", "wrongpassword");

    const errorMessage = GitHubPage.flashError;
    await errorMessage.waitForDisplayed({ timeout: 5000 });

    const errorText = await errorMessage.getText();
    console.log("Error message:", errorText);
    expect(errorText).toContain("Incorrect username or password");
  });

  it("should search for a repository", async () => {
    await GitHubPage.openSearch("angular");

    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl();
        return url.includes("angular");
      },
      {
        timeout: 5000,
        timeoutMsg: "Search page did not load",
      },
    );

    const url = await browser.getUrl();
    console.log("Search URL:", url);
    expect(url).toContain("angular");

    const html = await browser.getPageSource();
    expect(html).toContain("angular");
  });

  it("should navigate to GitHub explore page", async () => {
    await GitHubPage.openExplore();

    const url = await browser.getUrl();
    console.log("Explore URL:", url);
    expect(url).toContain("explore");

    const html = await browser.getPageSource();
    expect(html).toContain("Explore");
    console.log("Explore page loaded successfully");
  });
});

describe("GitHub tests", () => {
  it("should navigate to sign up page and fill in the form", async () => {
    await GitHubPage.openSignup();

    const url = await browser.getUrl();
    expect(url).toContain("signup");

    await GitHubPage.fillSignupEmail("testuser123abc@outlook.com");
    console.log("Clicked continue");

    await browser.pause(2000);

    const currentUrl = await browser.getUrl();
    console.log("URL after continue:", currentUrl);
    expect(currentUrl).toContain("github.com");
  });

  it("should find customer stories section and navigate to it", async () => {
    await GitHubPage.openCustomerStories();

    const url = await browser.getUrl();
    expect(url).toContain("customer-stories");

    const pageTitle = $("*=Meet the companies who build with GitHub");
    await pageTitle.waitForDisplayed({ timeout: 8000 });
    expect(await pageTitle.getText()).toContain(
      "Meet the companies who build with GitHub",
    );
    console.log("Page title found");

    const storyCard = GitHubPage.customerStoryCard;
    await storyCard.waitForDisplayed({ timeout: 5000 });
    await storyCard.scrollIntoView();
    await browser.pause(500);

    const href = await storyCard.getAttribute("href");
    console.log("Story href:", href);
    expect(href).toContain("customer-stories");

    await browser.url("https://github.com" + href);

    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes("customer-stories/");
      },
      {
        timeout: 8000,
        timeoutMsg: "Did not navigate to story page",
      },
    );

    const currentUrl = await browser.getUrl();
    console.log("Navigated to:", currentUrl);
    expect(currentUrl).toContain("customer-stories/");
  });

  it("should subscribe to the newsletter", async () => {
    await GitHubPage.openNewsletter();

    const url = await browser.getUrl();
    expect(url).toContain("newsletter");

    await GitHubPage.newsletterTitle.waitForDisplayed({ timeout: 8000 });
    expect(await GitHubPage.newsletterTitle.getText()).toContain(
      "Get our developer newsletter",
    );
    console.log("Newsletter title found");

    await GitHubPage.fillNewsletterForm("testuser@outlook.com", "Ukraine");
    console.log("Clicked subscribe");

    await GitHubPage.thankYouTitle.waitForDisplayed({ timeout: 10000 });
    const thanksTitleText = await GitHubPage.thankYouTitle.getText();
    console.log("Thanks title:", thanksTitleText);
    expect(thanksTitleText).toContain("Thanks for subscribing");
    console.log("Successfully subscribed");
  });

  it("should search for angular and check results", async () => {
    await GitHubPage.open();
    await GitHubPage.searchFor("angular");
    console.log("Searched for angular");

    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl();
        return url.includes("angular");
      },
      {
        timeout: 8000,
        timeoutMsg: "Search results did not load",
      },
    );

    const results = await $$('a[href*="angular"]');
    console.log("Number of results with angular in href:", results.length);
    expect(results.length).toBeGreaterThan(0);

    const firstResult = results[0];
    const href = await firstResult.getAttribute("href");
    console.log("First result href:", href);
    expect(href).toContain("angular");
  });

  it("should navigate to pricing and check features", async () => {
    await GitHubPage.open();
    await GitHubPage.clickPricing();
    console.log("Clicked pricing button");

    await GitHubPage.copilotTitle.waitForDisplayed({ timeout: 8000 });
    const copilotText = await GitHubPage.copilotTitle.getText();
    console.log("Copilot title:", copilotText);
    expect(copilotText).toContain("Try the Copilot-powered platform");

    await GitHubPage.clickCompareAllFeatures();
    console.log("Clicked Compare all features");

    await GitHubPage.compareFeaturesTitle.waitForDisplayed({ timeout: 8000 });
    const compareText = await GitHubPage.compareFeaturesTitle.getText();
    console.log("Compare features title:", compareText);
    expect(compareText).toContain("Compare features");
  });
});
