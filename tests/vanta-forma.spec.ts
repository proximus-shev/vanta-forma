import { expect, test, type Page } from "@playwright/test";

async function openHome(page: Page) {
  await page.goto("/");

  const skipIntro = page.getByRole("button", { name: "Skip intro" });
  if (await skipIntro.isVisible()) {
    await skipIntro.click();
    await expect(skipIntro).toBeHidden();
  }

  await expect(
    page.getByRole("heading", { name: /Where shadow shapes form/i }),
  ).toBeVisible();
}

test.describe("landing page interactions", () => {
  test("opens and closes the navigation menu with the keyboard", async ({
    page,
  }) => {
    await openHome(page);

    const menuButton = page.getByRole("button", {
      name: "Menu",
      exact: true,
    });
    await menuButton.click();

    await expect(
      page.getByRole("dialog", { name: "Navigation menu" }),
    ).toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");

    await expect(
      page.getByRole("dialog", { name: "Navigation menu" }),
    ).toBeHidden();
    await expect(menuButton).toBeFocused();
  });

  test("moves the selected-project rail with its controls", async ({ page }) => {
    await openHome(page);

    const controls = page.getByLabel("Project controls");
    await expect(controls.locator("span")).toHaveText("01 / 05");

    await controls.getByRole("button", { name: "Next project" }).click();
    await expect(controls.locator("span")).toHaveText("02 / 05");

    await controls.getByRole("button", { name: "Previous project" }).click();
    await expect(controls.locator("span")).toHaveText("01 / 05");
  });

  test("exposes working contact destinations", async ({ page }) => {
    await openHome(page);

    await expect(
      page.getByRole("link", { name: "Start a conversation" }),
    ).toHaveAttribute(
      "href",
      "mailto:eugeneshevey@gmail.com?subject=Vanta%20Forma%20Project%20Inquiry",
    );
    await expect(
      page.getByRole("link", { name: /Call Vanta Forma/ }),
    ).toHaveAttribute("href", "tel:+233592958353");
    await expect(
      page.getByRole("link", { name: /Message Vanta Forma on WhatsApp/ }),
    ).toHaveAttribute("href", "https://wa.me/233592958353");
    await expect(
      page.getByRole("link", { name: /Visit dashevy_ on Instagram/ }),
    ).toHaveAttribute("href", "https://www.instagram.com/dashevy_/");
  });
});

test.describe("project collection interactions", () => {
  test("filters projects and switches between grid and list layouts", async ({
    page,
  }) => {
    await page.goto("/projects");

    const projectCards = page
      .locator('section[aria-label="Portfolio projects"]')
      .locator("article");
    const firstCardLink = projectCards.first().locator("a");

    await expect(projectCards).toHaveCount(10);
    await expect(
      projectCards.first().getByText(/A bespoke three-storey mansion/i),
    ).toBeVisible();
    await expect
      .poll(() => firstCardLink.evaluate((element) => getComputedStyle(element).display))
      .toBe("flex");

    await page.getByRole("button", { name: "Filter projects" }).click();
    const filterDialog = page.getByRole("dialog", {
      name: "Filter projects by category",
    });
    await expect(filterDialog).toBeVisible();
    await filterDialog.getByRole("button", { name: /Hospitality/ }).click();

    await expect(
      page.getByRole("button", { name: "Filter: Hospitality" }),
    ).toBeVisible();
    await expect(projectCards).toHaveCount(1);
    await expect(page.getByText("Box & Bar", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "List view" }).click();
    await expect(
      page.getByRole("button", { name: "List view" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect
      .poll(() => firstCardLink.evaluate((element) => getComputedStyle(element).display))
      .toBe("grid");
  });

  test("closes the compact project menu outside and with Escape", async ({
    page,
  }) => {
    await page.goto("/projects");

    const menu = page.locator("details").first();
    const summary = menu.locator("summary");
    await summary.click();
    await expect(summary).toHaveAttribute("aria-expanded", "true");

    await page
      .getByRole("heading", { name: /Shaped with intention/i })
      .dispatchEvent("pointerdown");
    await expect(summary).toHaveAttribute("aria-expanded", "false");

    await summary.click();
    await expect(summary).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(summary).toHaveAttribute("aria-expanded", "false");
    await expect(summary).toBeFocused();
  });
});

test.describe("project detail interactions", () => {
  test("opens and navigates the full-screen image viewer", async ({ page }) => {
    await page.goto("/projects/executive-residence");

    const viewAll = page.getByRole("button", { name: "View all images" });
    await viewAll.click();

    const viewer = page.getByRole("dialog", {
      name: "Executive Residence image viewer",
    });
    await expect(viewer).toBeVisible();
    await expect(viewer.getByText(/Image 01 \/ 07/)).toBeVisible();

    await viewer.getByRole("button", { name: "Next image" }).click();
    await expect(viewer.getByText(/Image 02 \/ 07/)).toBeVisible();

    await page.keyboard.press("ArrowRight");
    await expect(viewer.getByText(/Image 03 \/ 07/)).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(viewer).toBeHidden();
    await expect(viewAll).toBeFocused();
  });

  test("keeps gallery pagination synchronized", async ({ page }) => {
    await page.goto("/projects/executive-residence");

    const thirdImage = page.getByRole("button", {
      name: "Show image 3 of 7",
    });
    if (test.info().project.name === "desktop-chromium") {
      await page
        .getByRole("button", { name: /Select image 3 of 7/ })
        .hover();
      await expect(thirdImage).toHaveAttribute("aria-current", "true");
    }

    const fourthImage = page.getByRole("button", {
      name: "Show image 4 of 7",
    });
    await fourthImage.click();
    await expect(fourthImage).toHaveAttribute("aria-current", "true");

    await thirdImage.click();
    await expect(thirdImage).toHaveAttribute("aria-current", "true");
  });

  test("navigates to the next project", async ({ page }) => {
    await page.goto("/projects/layered-frames");

    await page
      .getByRole("link", {
        name: /^Next project \/ 04 Garden Embrace Residence/,
      })
      .click();

    await expect(page).toHaveURL(/\/projects\/garden-embrace-residence$/);
    await expect(
      page.getByRole("heading", { name: "Garden Embrace Residence" }),
    ).toBeVisible();
  });
});
