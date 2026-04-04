import { expect } from "@wdio/globals";
// import { assert } from "assert/strict";

// describe('Webdriverio main page', () => {
//     it('should have correct title ', async () => {
//         await browser.url(`https://webdriver.io/`);

//         const title = await browser.getTitle();
//         console.log(title)

//         await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');
//     })
// })

// describe("Google test", () => {
//   it("should check search input", async () => {
//     await browser.url("https://www.google.com/");

//     const originalWindow = await browser.getWindowHandle();

//     const searchInput = $('[name="q"]');
//     await browser.waitUntil(async () => await searchInput.isDisplayed(), {
//       timeout: 5000,
//       timeoutMsg: "Search input not visible",
//     });
//     await searchInput.scrollIntoView();
//     console.log("Scrolled into view");

//     const isVisible = await searchInput.isDisplayed();
//     console.log("Is displayed:", isVisible);

//     const isEnabled = await searchInput.isEnabled();
//     console.log("Is enabled:", isEnabled);

//     const isFocused = await searchInput.isFocused();
//     console.log("Is focused:", isFocused);

//     const isClickable = await searchInput.isClickable();
//     console.log("Is clickable:", isClickable);

//     await searchInput.waitForDisplayed();
//     await searchInput.saveScreenshot("./screenshots/searchInput.png");
//     console.log("Element screenshot saved");

//     await browser.newWindow("https://www.google.com/maps/place/London");
//     console.log("New window opened");

//     await browser.switchWindow("London");
//     console.log("Switched to new window:", await browser.getTitle());

//     await browser.switchWindow(originalWindow);
//     console.log("Switched back to original window:", await browser.getTitle());
//   });
// });

// describe("Testing GitHub pages", () => {
//   it("should load the homepage and check the title", async () => {
//     await browser.url("https://github.com/");

//     const title = await browser.getTitle();
//     console.log("Page title:", title);
//     expect(title).toContain("GitHub");
//   });

//   it("should navigate to login page", async () => {
//     await browser.url("https://github.com/login");

//     const url = await browser.getUrl();
//     console.log("Current URL:", url);
//     expect(url).toContain("/login");
//   });

//   it("should show error on invalid login", async () => {
//     await browser.url("https://github.com/login");

//     const usernameInput = $("#login_field");
//     const passwordInput = $("#password");
//     const signInButton = $('[name="commit"]');

//     await usernameInput.setValue("invaliduser123");
//     await passwordInput.setValue("wrongpassword");
//     await signInButton.click();

//     const errorMessage = $(".flash-error");
//     await errorMessage.waitForDisplayed({ timeout: 5000 });

//     const errorText = await errorMessage.getText();
//     console.log("Error message:", errorText);
//     expect(errorText).toContain("Incorrect username or password");
//   });

//   it("should search for a repository", async () => {
//     await browser.url("https://github.com/search?q=angular&type=repositories");

//     await browser.waitUntil(
//       async () => {
//         const url = await browser.getUrl();
//         return url.includes("angular");
//       },
//       {
//         timeout: 5000,
//         timeoutMsg: "Search page did not load",
//       },
//     );

//     const url = await browser.getUrl();
//     console.log("Search URL:", url);
//     expect(url).toContain("angular");

//     const html = await browser.getPageSource();
//     expect(html).toContain("angular");
//   });

//   it("should navigate to GitHub explore page", async () => {
//     await browser.url("https://github.com/explore");

//     const url = await browser.getUrl();
//     console.log("Explore URL:", url);
//     expect(url).toContain("explore");

//     const html = await browser.getPageSource();
//     expect(html).toContain("Explore");
//     console.log("Explore page loaded successfully");
//   });
// });

describe("GitHub tests", () => {
  it("should navigate to sign up page and fill in the form", async () => {
    await browser.url("https://github.com/signup");

    const url = await browser.getUrl();
    expect(url).toContain("signup");

    const emailInput = $("#email");
    await emailInput.waitForDisplayed({ timeout: 5000 });
    await emailInput.setValue("testuser123abc@outlook.com");

    const continueButton = $("button*=Continue");
    await continueButton.waitForDisplayed({ timeout: 5000 });
    await continueButton.click();
    console.log("Clicked continue");

    await browser.pause(2000);

    const currentUrl = await browser.getUrl();
    console.log("URL after continue:", currentUrl);
    expect(currentUrl).toContain("github.com");
  });
  it("should find customer stories section and navigate to it", async () => {
    await browser.url("https://github.com/customer-stories");

    const url = await browser.getUrl();
    expect(url).toContain("customer-stories");

    const pageTitle = $("*=Meet the companies who build with GitHub");
    await pageTitle.waitForDisplayed({ timeout: 8000 });
    expect(await pageTitle.getText()).toContain(
      "Meet the companies who build with GitHub",
    );
    console.log("Page title found");

    const storyCard = $("a.customer-story-card");
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
    await browser.url("https://github.com/newsletter");

    const url = await browser.getUrl();
    expect(url).toContain("newsletter");

    const newsletterTitle = $("h1*=Get our developer newsletter");
    await newsletterTitle.waitForDisplayed({ timeout: 8000 });
    expect(await newsletterTitle.getText()).toContain(
      "Get our developer newsletter",
    );
    console.log("Newsletter title found");

    const emailInput = $('input[type="email"]');
    await emailInput.waitForDisplayed({ timeout: 5000 });
    await emailInput.setValue("testuser@outlook.com");
    console.log("Email filled");

    const countryDropdown = $('select[name="country"]');
    await countryDropdown.waitForDisplayed({ timeout: 5000 });
    await countryDropdown.selectByVisibleText("Ukraine");
    console.log("Selected country");

    await browser.execute("window.scrollBy(0, 500)");
    await browser.pause(500);

    const checkbox = $('[name="marketing_email_opt_in"]');
    await checkbox.scrollIntoView();
    await browser.pause(500);

    const checkboxWrapper = $(
      '[name="marketing_email_opt_in"]',
    ).parentElement();
    await checkboxWrapper.scrollIntoView();
    await checkboxWrapper.click();
    console.log("Checkbox checked");

    const submitButton = $(
      'button[type="submit"][data-analytics-event*="subscribe"]',
    );
    await submitButton.scrollIntoView();
    await submitButton.waitForDisplayed({ timeout: 5000 });
    await submitButton.click();
    console.log("Clicked subscribe");

    const thanksTitle = $("#hero-section-brand-heading");
    await thanksTitle.waitForDisplayed({ timeout: 10000 });
    const thanksTitleText = await thanksTitle.getText();
    console.log("Thanks title:", thanksTitleText);
    expect(thanksTitleText).toContain("Thanks for subscribing");
    console.log("Successfully subscribed");
  });

  it("should search for angular and check results", async () => {
    await browser.url("https://github.com/");

    const searchInput = $(
      'input[name="q"], [data-target="qbsearch-input.inputButton"]',
    );
    await searchInput.waitForDisplayed({ timeout: 5000 });
    await searchInput.click();

    const searchBox = $(
      'input[data-testid="site-search-input"], input[name="query-builder-test"]',
    );
    await searchBox.waitForDisplayed({ timeout: 5000 });
    await searchBox.setValue("angular");

    await browser.keys("Enter");
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
    await browser.url("https://github.com/");

    const pricingLink = $('a[href="/pricing"]');
    await pricingLink.waitForDisplayed({ timeout: 5000 });
    await pricingLink.click();
    console.log("Clicked pricing button");

    const copilotTitle = $("*=Try the Copilot-powered platform");
    await copilotTitle.waitForDisplayed({ timeout: 8000 });
    const copilotText = await copilotTitle.getText();
    console.log("Copilot title:", copilotText);
    expect(copilotText).toContain("Try the Copilot-powered platform");

    const compareFeaturesLink = $("*=Compare all features");
    await compareFeaturesLink.scrollIntoView();
    console.log("Scrolled to Compare all features");

    expect(await compareFeaturesLink.isDisplayed()).toBe(true);
    await compareFeaturesLink.click();
    console.log("Clicked Compare all features");

    const compareTitle = $("*=Compare features");
    await compareTitle.waitForDisplayed({ timeout: 8000 });
    const compareText = await compareTitle.getText();
    console.log("Compare features title:", compareText);
    expect(compareText).toContain("Compare features");
  });
});
