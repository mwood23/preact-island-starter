import { test, expect } from '@playwright/test'
import { getByTestId, getIsland } from './test-utils/helpers'

test('should render the island allow the modal to render', async ({ page }) => {
  const island = await getIsland(page, 'call-to-action-island')

  const dimmerCount = await page.locator('starter-dimmer').count()
  await expect(dimmerCount).toBe(0)
  const modalCount = await page.locator('starter-modal').count()
  await expect(modalCount).toBe(0)

  const button = await getByTestId(island, 'callToAction')
  await button.click()

  const dimmerCount1 = await page.locator('starter-dimmer').count()
  await expect(dimmerCount1).toBe(1)
  const modalCount1 = await page.locator('starter-modal').count()
  await expect(modalCount1).toBe(1)
})
