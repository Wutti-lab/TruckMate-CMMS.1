
// This file combines all German translation categories
import { authTranslations } from "./auth";
import { navigationTranslations } from "./navigation";
import { dashboardTranslations } from "./dashboard";
import { vehicleTranslations } from "./vehicle";
import { driverTranslations } from "./driver";
import { pricingTranslations } from "./pricing";
import { inspectionTranslations } from "./inspection";
import { advertisementTranslations } from "./advertisement";
import { customerTranslations } from "./customer";
import { workOrderTranslations } from "./workorder";

// Common translations for new components  
const commonTranslations = {
  // Real-time components
  "realTimeTracking": "Echtzeit-Verfolgung",
  "activeVehicles": "Aktive Fahrzeuge", 
  "realtimeMetrics": "Echtzeit-Metriken",
  "liveActivityFeed": "Live-Aktivitätsfeed",
  "fleetAnalytics": "Flottenanalyse",
  "alertsManager": "Warnungen & Benachrichtigungen",
  "criticalAlerts": "Kritische Warnungen",
  "fuelEfficiency": "Kraftstoffeffizienz",
  "vehicleUtilization": "Fahrzeugauslastung",
  
  // Error messages
  "somethingWentWrong": "Etwas ist schiefgelaufen",
  "tryAgain": "Erneut versuchen",
  "errorOccurred": "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
  "refreshPage": "Seite aktualisieren",
  "applicationError": "Die Anwendung ist auf einen unerwarteten Fehler gestoßen. Bitte aktualisieren Sie die Seite oder versuchen Sie es später erneut.",
  
  // Loading states
  "loading": "Lädt...",
  "noDataAvailable": "Keine Daten verfügbar",
  "noActivitiesFound": "Keine Aktivitäten gefunden",
  "errorLoadingData": "Fehler beim Laden der Daten",
  
  // General UI
  "save": "Speichern",
  "cancel": "Abbrechen",
  "edit": "Bearbeiten",
  "delete": "Löschen",
  "search": "Suchen",
  "filter": "Filtern",
  "refresh": "Aktualisieren",
  "export": "Exportieren",
  "import": "Importieren",
  "settings": "Einstellungen",
  "help": "Hilfe",
  "logout": "Abmelden",
  "loggedInAs": "Angemeldet als"
};

// Combine all translation categories
export const deTranslations = {
  ...authTranslations,
  ...navigationTranslations,
  ...dashboardTranslations,
  ...vehicleTranslations,
  ...driverTranslations,
  ...pricingTranslations,
  ...inspectionTranslations,
  ...advertisementTranslations,
  ...customerTranslations,
  ...workOrderTranslations,
  ...commonTranslations,
};
