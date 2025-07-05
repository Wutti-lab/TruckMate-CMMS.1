
// This file combines all Thai translation categories
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
  "realTimeTracking": "การติดตามแบบเรียลไทม์",
  "activeVehicles": "ยานพาหนะที่ใช้งาน",
  "realtimeMetrics": "เมตริกแบบเรียลไทม์", 
  "liveActivityFeed": "ฟีดกิจกรรมสด",
  "fleetAnalytics": "การวิเคราะห์กองยานพาหนะ",
  "alertsManager": "การแจ้งเตือนและการบริหารจัดการ",
  "criticalAlerts": "การแจ้งเตือนที่สำคัญ",
  "fuelEfficiency": "ประสิทธิภาพเชื้อเพลิง",
  "vehicleUtilization": "การใช้งานยานพาหนะ",
  
  // Error messages
  "somethingWentWrong": "มีบางอย่างผิดพลาด",
  "tryAgain": "ลองอีกครั้ง",
  "errorOccurred": "เกิดข้อผิดพลาดที่ไม่คาดคิด โปรดลองอีกครั้ง",
  "refreshPage": "รีเฟรชหน้า",
  "applicationError": "แอปพลิเคชันพบข้อผิดพลาดที่ไม่คาดคิด กรุณารีเฟรชหน้าหรือลองใหม่ในภายหลัง",
  
  // Loading states
  "loading": "กำลังโหลด...",
  "noDataAvailable": "ไม่มีข้อมูล",
  "noActivitiesFound": "ไม่พบกิจกรรม",
  "errorLoadingData": "เกิดข้อผิดพลาดในการโหลดข้อมูล",
  
  // General UI
  "save": "บันทึก",
  "cancel": "ยกเลิก", 
  "edit": "แก้ไข",
  "delete": "ลบ",
  "search": "ค้นหา",
  "filter": "กรอง",
  "refresh": "รีเฟรช",
  "export": "ส่งออก",
  "import": "นำเข้า",
  "settings": "การตั้งค่า",
  "help": "ช่วยเหลือ",
  "logout": "ออกจากระบบ",
  "loggedInAs": "ลงชื่อเข้าใช้ในชื่อ"
};

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
  ...customerTranslations,
  ...workOrderTranslations,
  ...commonTranslations,
};
