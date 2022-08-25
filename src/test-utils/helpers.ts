import { expect, Locator, Page } from '@playwright/test'

export const getIsland = async (page: Page, name: string) => {
  await page.goto('./')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Islands/)

  return page.locator(name)
}

export const getByTestId = async (locator: Locator, testId: string) => {
  return locator.locator(`data-testid=${testId}`)
}
