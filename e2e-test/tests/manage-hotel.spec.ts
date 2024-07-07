import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  //Check if the sign in page opened
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  //Fill the email and password field
  await page.locator("[name=email]").fill("1@3.com");
  await page.locator("[name=password]").fill("123456");

  //Click log in button
  await page.getByRole("button", { name: "Login" }).click();

  //Check if sign in successful
  await expect(page.getByText("Sign In Successful!")).toBeVisible();
});

test("should allow user to create a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);
  await page.locator("[name=name]").fill("Test Hotel");
  await page.locator("[name=city]").fill("Test City");
  await page.locator("[name=country]").fill("Test Country");
  await page
    .locator("[name=description]")
    .fill("Test this is the description section of the page");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("select[name=starRating]", "5");

  await page.getByText("Campsite").click();

  await page.getByLabel("Parking").check();
  await page.getByLabel("Spa").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "Hotel1.jpg"),
  ]);

  await page.getByRole("button", { name: "save" }).click();

  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await expect(page.getByText("Test Hotel")).toBeVisible();
  await expect(page.getByText("Test this is the description")).toBeVisible();
  await expect(page.getByText("Test City, Test Country")).toBeVisible();
  await expect(page.getByText("Campsite")).toBeVisible();
  await expect(page.getByText("$100 Per Night")).toBeVisible();
  await expect(page.getByText("2 Adults, 4 Children")).toBeVisible();
  await expect(page.getByText("5 Star Rating")).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});


test("should edit hotel", async({page}) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await page.getByRole("link", {name: "View Details"}).first().click();

    await page.waitForSelector('[name="name"]', {state:"attached"})
    await expect(page.locator('[name="name"]')).toHaveValue('Test Hotel')
    await page.locator('[name="name"]').fill("Test Hotel Updated");
    await page.getByRole("button", {name: "save"}).click();
    await expect(page.getByText("Hotel Updated Successfully")).toBeVisible();

    await page.reload();

    await expect(page.locator('[name="name"]')).toHaveValue('Test Hotel Updated')
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.getByRole("button", {name: "save"}).click();
})