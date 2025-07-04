
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, User, Phone, Mail, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for deliveries
const deliveries = [
  {
    id: 1,
    customerName: {
      en: "Company ABC Ltd.", 
      th: "บริษัท ABC จำกัด", 
      de: "Firma ABC GmbH"
    },
    contactPerson: {
      en: "John Smith", 
      th: "จอห์น สมิธ", 
      de: "Johann Schmidt"
    },
    phone: "+66 123 456789",
    email: "j.smith@abc.com",
    pickupLocation: {
      en: "Industrial Street 1, Bangkok", 
      th: "ถนนอุตสาหกรรม 1 กรุงเทพ", 
      de: "Industriestraße 1, Bangkok"
    },
    deliveryLocation: {
      en: "Harbor Street 10, Pattaya", 
      th: "ถนนท่าเรือ 10 พัทยา", 
      de: "Hafenstraße 10, Pattaya"
    },
    status: {
      en: "Active", 
      th: "ใช้งาน", 
      de: "Aktiv"
    },
  },
  {
    id: 2,
    customerName: {
      en: "Logistics XYZ", 
      th: "โลจิสติกส์ XYZ", 
      de: "Logistik XYZ"
    },
    contactPerson: {
      en: "Mary Johnson", 
      th: "แมรี่ จอห์นสัน", 
      de: "Maria Johannson"
    },
    phone: "+66 987 654321",
    email: "m.johnson@xyz.com",
    pickupLocation: {
      en: "Main Street 25, Bangkok", 
      th: "ถนนเมน 25 กรุงเทพ", 
      de: "Hauptstraße 25, Bangkok"
    },
    deliveryLocation: {
      en: "Station Street 5, Chonburi", 
      th: "ถนนสถานี 5 ชลบุรี", 
      de: "Bahnhofstraße 5, Chonburi"
    },
    status: {
      en: "In Progress", 
      th: "กำลังดำเนินการ", 
      de: "In Bearbeitung"
    },
  },
];

export function DeliveryManagement() {
  const { language, t } = useLanguage();
  
  const openGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };
  
  const getLocalizedText = (textObj: {en: string, th: string, de: string}) => {
    return textObj[language as keyof typeof textObj] || textObj.en;
  };
  
  const getPageTitle = () => {
    switch (language) {
      case 'th':
        return "การจัดส่งและลูกค้า";
      case 'de':
        return "Lieferungen & Kunden";
      default:
        return "Deliveries & Customers";
    }
  };
  
  const getButtonText = () => {
    switch (language) {
      case 'th':
        return "การจัดส่งใหม่";
      case 'de':
        return "Neue Lieferung";
      default:
        return "New Delivery";
    }
  };
  
  const getTableHeaders = () => {
    const headers = {
      customer: language === 'th' ? "ลูกค้า" : language === 'de' ? "Kunde" : "Customer",
      contact: language === 'th' ? "ติดต่อ" : language === 'de' ? "Kontakt" : "Contact",
      pickupLocation: language === 'th' ? "สถานที่รับ" : language === 'de' ? "Abholort" : "Pickup Location",
      deliveryLocation: language === 'th' ? "สถานที่ส่ง" : language === 'de' ? "Lieferort" : "Delivery Location",
      status: language === 'th' ? "สถานะ" : language === 'de' ? "Status" : "Status",
      map: language === 'th' ? "แผนที่" : language === 'de' ? "Karte" : "Map",
    };
    
    return headers;
  };
  
  const getMenuItems = () => {
    const items = {
      viewDetails: language === 'th' ? "ดูรายละเอียด" : language === 'de' ? "Details anzeigen" : "View Details",
      edit: language === 'th' ? "แก้ไข" : language === 'de' ? "Bearbeiten" : "Edit",
      delete: language === 'th' ? "ลบ" : language === 'de' ? "Löschen" : "Delete",
    };
    
    return items;
  };
  
  const getMapButtonText = () => {
    return {
      appMap: language === 'th' ? "แผนที่แอป" : language === 'de' ? "App-Karte" : "App Map",
      googleMaps: "Google Maps" // Same in all languages
    };
  };

  const headers = getTableHeaders();
  const menuItems = getMenuItems();
  const mapButtons = getMapButtonText();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{getPageTitle()}</h2>
        <Button>
          {getButtonText()}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{headers.customer}</TableHead>
            <TableHead>{headers.contact}</TableHead>
            <TableHead>{headers.pickupLocation}</TableHead>
            <TableHead>{headers.deliveryLocation}</TableHead>
            <TableHead>{headers.status}</TableHead>
            <TableHead>{headers.map}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{getLocalizedText(delivery.customerName)}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User size={14} />
                    {getLocalizedText(delivery.contactPerson)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone size={14} />
                    {delivery.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail size={14} />
                    {delivery.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-red-500" />
                  {getLocalizedText(delivery.pickupLocation)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-green-500" />
                  {getLocalizedText(delivery.deliveryLocation)}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    getLocalizedText(delivery.status).includes("Active") || 
                    getLocalizedText(delivery.status).includes("Aktiv") || 
                    getLocalizedText(delivery.status).includes("ใช้งาน")
                      ? "border-green-200 bg-green-50 text-green-600"
                      : "border-orange-200 bg-orange-50 text-orange-600"
                  }
                >
                  {getLocalizedText(delivery.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link to="/map">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <MapPin size={14} className="text-fleet-500" />
                      {mapButtons.appMap}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => openGoogleMaps(getLocalizedText(delivery.deliveryLocation))}
                  >
                    <MapPin size={14} className="text-red-500" />
                    {mapButtons.googleMaps}
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    <DropdownMenuItem>{menuItems.viewDetails}</DropdownMenuItem>
                    <DropdownMenuItem>{menuItems.edit}</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">{menuItems.delete}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
