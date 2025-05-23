
// This file aggregates all pricing-related translations
import { pricingGeneralTranslations } from './pricing-general';
import { pricingPackagesTranslations } from './pricing-packages';
import { pricingInfrastructureTranslations } from './pricing-infrastructure';

// Combine all pricing translation categories
export const pricingTranslations = {
  ...pricingGeneralTranslations,
  ...pricingPackagesTranslations,
  ...pricingInfrastructureTranslations,
};
