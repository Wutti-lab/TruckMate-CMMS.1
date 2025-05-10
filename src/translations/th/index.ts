
// This file combines all Thai translation categories
import { authTranslations } from "./auth";
import { navigationTranslations } from "./navigation";
import { dashboardTranslations } from "./dashboard";
import { vehicleTranslations } from "./vehicle";
import { driverTranslations } from "./driver";
import { pricingTranslations } from "./pricing";
import { inspectionTranslations } from "./inspection";
import { advertisementTranslations } from "./advertisement";

// Combine all translation categories
export const thTranslations = {
  ...authTranslations,
  ...navigationTranslations,
  ...dashboardTranslations,
  ...vehicleTranslations,
  ...driverTranslations,
  ...pricingTranslations,
  ...inspectionTranslations,
  ...advertisementTranslations,
};

