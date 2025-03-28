import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test("should allow the user to sign in", async ({ page }) => {
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
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random()*90000) +10000}@test.com`
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await page.getByRole("link", { name: "Create an account here" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test1");
  await page.locator("[name=lastName]").fill("testing");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");
  
  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Success!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
