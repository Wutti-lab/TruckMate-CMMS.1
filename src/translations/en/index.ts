
// This file combines all English translation categories
import { authTranslations } from "./auth";
import { navigationTranslations } from "./navigation";
import { dashboardTranslations } from "./dashboard";
import { vehicleTranslations } from "./vehicle";
import { driverTranslations } from "./driver";
import { pricingTranslations } from "./pricing";
import { inspectionTranslations } from "./inspection";
import { advertisementTranslations } from "./advertisement";
import { customerTranslations } from "./customer";

// Common translations for new components
const commonTranslations = {
  // Real-time components
  "realTimeTracking": "Real-time Tracking",
  "activeVehicles": "Active Vehicles",
  "realtimeMetrics": "Real-time Metrics", 
  "liveActivityFeed": "Live Activity Feed",
  "fleetAnalytics": "Fleet Analytics",
  "alertsManager": "Alerts & Notifications",
  "criticalAlerts": "Critical Alerts",
  "fuelEfficiency": "Fuel Efficiency",
  "vehicleUtilization": "Vehicle Utilization",
  
  // Error messages
  "somethingWentWrong": "Something went wrong",
  "tryAgain": "Try again",
  "errorOccurred": "An unexpected error occurred. Please try again.",
  "refreshPage": "Refresh page",
  "applicationError": "The application encountered an unexpected error. Please refresh the page or try again later.",
  
  // Loading states
  "loading": "Loading...",
  "noDataAvailable": "No data available",
  "noActivitiesFound": "No activities found",
  "errorLoadingData": "Error loading data",
  "loggedInAs": "Logged in as"
};

// Combine all translation categories
export const enTranslations = {
  ...authTranslations,
  ...navigationTranslations,
  ...dashboardTranslations,
  ...vehicleTranslations,
  ...driverTranslations,
  ...pricingTranslations,
  ...inspectionTranslations,
  ...advertisementTranslations,
  ...customerTranslations,
  ...commonTranslations,
};
