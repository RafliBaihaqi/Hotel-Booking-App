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

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Test City");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels found in Test City")).toBeVisible();
  await expect(page.getByText("Test Hotel")).toBeVisible();
});
