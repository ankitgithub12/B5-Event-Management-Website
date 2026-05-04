// ============================================================
//  CONTROLLER: packageController.js
//  Logic for filtering and matching packages to user needs.
// ============================================================

import { PACKAGES } from '../models/packages.model'
import { PACKAGE_THRESHOLDS } from '../models/pricing.model'

/**
 * Get a package by its id.
 */
export function getPackageById(id) {
  return PACKAGES.find((p) => p.id === id) ?? null
}

/**
 * Suggest the best-fit package based on a budget.
 */
export function suggestPackage(budget) {
  for (const [id, threshold] of Object.entries(PACKAGE_THRESHOLDS)) {
    if (budget <= threshold) {
      return getPackageById(id)
    }
  }
  return getPackageById('luxury')
}

/**
 * Filter packages that fit within a given max budget.
 */
export function filterByBudget(maxBudget) {
  return PACKAGES.filter((p) => p.priceRange.min <= maxBudget)
}
