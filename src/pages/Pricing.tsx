
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, User, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (plan: string) => {
    setIsProcessing(true);
    // Simuliere einen Zahlungsprozess
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Zahlung erfolgreich | การชำระเงินสำเร็จ",
        description: `Vielen Dank für Ihren Kauf des ${plan}-Plans | ขอบคุณสำหรับการซื้อแผน ${plan}`,
      });
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">TruckMate CMMS Preismodell | โมเดลราคา</h1>
            <p className="text-muted-foreground">
              Wählen Sie den Plan, der am besten zu Ihren Anforderungen passt | เลือกแผนที่ตรงกับความต้องการของคุณ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* LKW-Plan */}
            <Card className="flex flex-col border-2 border-fleet-200 hover:border-fleet-400 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-fleet-100">
                    <Truck className="h-10 w-10 text-fleet-600" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">Fahrzeug-Plan | แผนยานพาหนะ</CardTitle>
                <CardDescription className="text-center text-lg mt-2">
                  5,000 ฿ <span className="text-sm">pro Fahrzeug / ต่อยานพาหนะ</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Vollständiges Fahrzeugmanagement | การจัดการยานพาหนะเต็มรูปแบบ</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Fahrzeuginspektionen | การตรวจสอบยานพาหนะ</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Wartungsverfolgung | การติดตามการบำรุงรักษา</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>QR-Code-Unterstützung | รองรับ QR โค้ด</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>1 Benutzer inklusive | รวมผู้ใช้ 1 คน</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-fleet-600" 
                  onClick={() => handlePayment("Fahrzeug")}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Verarbeitung... | กำลังดำเนินการ..." : "Jetzt kaufen | ซื้อเลย"}
                </Button>
              </CardFooter>
            </Card>

            {/* Benutzer-Plan */}
            <Card className="flex flex-col border-2 border-fleet-200 hover:border-fleet-400 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-fleet-100">
                    <User className="h-10 w-10 text-fleet-600" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">Nutzer-Plan | แผนผู้ใช้</CardTitle>
                <CardDescription className="text-center text-lg mt-2">
                  2,000 ฿ <span className="text-sm">pro Benutzer / ต่อผู้ใช้</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Individuelles Benutzerprofil | โปรไฟล์ผู้ใช้ส่วนบุคคล</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Rollenbasierte Zugriffsrechte | การเข้าถึงตามบทบาท</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Benutzerspezifische Dashboards | แดชบอร์ดเฉพาะผู้ใช้</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Aktivitätsprotokolle | บันทึกกิจกรรม</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Mobile App-Zugang | การเข้าถึงแอปมือถือ</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-fleet-600" 
                  onClick={() => handlePayment("Benutzer")}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Verarbeitung... | กำลังดำเนินการ..." : "Jetzt kaufen | ซื้อเลย"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Benötigen Sie ein individuelles Angebot? | ต้องการข้อเสนอที่กำหนดเอง?</h2>
            <p className="mb-4 max-w-2xl mx-auto">
              Kontaktieren Sie uns für maßgeschneiderte Lösungen für größere Flotten oder spezielle Anforderungen.
              <br />
              ติดต่อเราสำหรับโซลูชันที่ปรับแต่งสำหรับกองยานพาหนะขนาดใหญ่หรือความต้องการพิเศษ
            </p>
            <Button variant="outline">Kontakt | ติดต่อ</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
