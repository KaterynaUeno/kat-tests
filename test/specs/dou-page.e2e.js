import DouPage from "../page-objects/dou-page.js";

describe("DOU tests", () => {
  it("1. should navigate to Зарплати and check I Квартиль header", async () => {
    await DouPage.open();

    await DouPage.clickSalaries();

    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl();
        return url.includes("salaries");
      },
      {
        timeout: 8000,
        timeoutMsg: "Did not navigate to salaries page",
      },
    );

    const url = await browser.getUrl();
    console.log("Salaries URL:", url);
    expect(url).toContain("salaries");

    const header = await DouPage.salariesHeader;
    await header.waitForDisplayed({ timeout: 8000 });
    const headerText = await header.getText();
    console.log("Header text:", headerText);
    expect(headerText.toUpperCase()).toContain("I КВАРТИЛЬ");
  });

  it("2. should navigate to Робота and check Знайти button and quick nav", async () => {
    await DouPage.open();

    await DouPage.clickWork();

    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl();
        return url === "https://jobs.dou.ua/";
      },
      {
        timeout: 8000,
        timeoutMsg: "Did not navigate to Робота page",
      },
    );

    const searchButton = await DouPage.searchButton;
    await searchButton.waitForDisplayed({ timeout: 5000 });
    expect(await searchButton.isDisplayed()).toBe(true);
    console.log("Знайти button exists");

    const searchValue = await searchButton.getAttribute("value");
    console.log("Button value:", searchValue);
    expect(searchValue).toContain("Знайти");

    await DouPage.clickSearch();
    console.log("Clicked Знайти");

    const quickNav = await DouPage.quickNavSection;
    await quickNav.waitForDisplayed({ timeout: 8000 });
    const quickNavText = await quickNav.getText();
    console.log("Quick nav text:", quickNavText);
    expect(quickNavText).toContain("Швидкий перехід");
    expect(quickNavText).toContain("початківцям");
    expect(quickNavText).toContain("govtech");
    console.log("Quick nav section verified");
  });

  it("3. should navigate to DefTech and check Популярне на форумі and Обговорюють зараз", async () => {
    await DouPage.open();

    await DouPage.clickDefTech();

    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl();
        return url.includes("deftech");
      },
      {
        timeout: 8000,
        timeoutMsg: "Did not navigate to DefTech page",
      },
    );

    const url = await browser.getUrl();
    console.log("DefTech URL:", url);
    expect(url).toContain("deftech");

    const popularLink = await DouPage.popularForumLink;
    await popularLink.waitForDisplayed({ timeout: 8000 });
    const popularText = await popularLink.getText();
    console.log("Popular forum link text:", popularText);
    expect(popularText).toContain("Популярне на форумі");

    const discussingNow = await DouPage.discussingNowSection;
    await discussingNow.waitForDisplayed({ timeout: 8000 });
    const discussingText = await discussingNow.getText();
    console.log("Discussing now text:", discussingText);
    expect(discussingText).toContain("Обговорюють зараз");
  });
});
