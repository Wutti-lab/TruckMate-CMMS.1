
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
    // Simulate a payment process
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment successful | การชำระเงินสำเร็จ",
        description: `Thank you for purchasing the ${plan} plan | ขอบคุณสำหรับการซื้อแผน ${plan}`,
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
            <h1 className="text-3xl font-bold mb-2">TruckMate CMMS Pricing Model | โมเดลราคา</h1>
            <p className="text-muted-foreground">
              Choose the plan that best suits your requirements | เลือกแผนที่ตรงกับความต้องการของคุณ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vehicle Plan */}
            <Card className="flex flex-col border-2 border-fleet-200 hover:border-fleet-400 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-fleet-100">
                    <Truck className="h-10 w-10 text-fleet-600" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">Vehicle Plan | แผนยานพาหนะ</CardTitle>
                <CardDescription className="text-center text-lg mt-2">
                  5,000 ฿ <span className="text-sm">per vehicle / ต่อยานพาหนะ</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Complete vehicle management | การจัดการยานพาหนะเต็มรูปแบบ</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Vehicle inspections | การตรวจสอบยานพาหนะ</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Maintenance tracking | การติดตามการบำรุงรักษา</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>QR code support | รองรับ QR โค้ด</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>1 user included | รวมผู้ใช้ 1 คน</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-fleet-600" 
                  onClick={() => handlePayment("Vehicle")}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing... | กำลังดำเนินการ..." : "Buy now | ซื้อเลย"}
                </Button>
              </CardFooter>
            </Card>

            {/* User Plan */}
            <Card className="flex flex-col border-2 border-fleet-200 hover:border-fleet-400 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-fleet-100">
                    <User className="h-10 w-10 text-fleet-600" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">User Plan | แผนผู้ใช้</CardTitle>
                <CardDescription className="text-center text-lg mt-2">
                  2,000 ฿ <span className="text-sm">per user / ต่อผู้ใช้</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Individual user profile | โปรไฟล์ผู้ใช้ส่วนบุคคล</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Role-based access rights | การเข้าถึงตามบทบาท</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>User-specific dashboards | แดชบอร์ดเฉพาะผู้ใช้</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Activity logs | บันทึกกิจกรรม</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>Mobile app access | การเข้าถึงแอปมือถือ</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-fleet-600" 
                  onClick={() => handlePayment("User")}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing... | กำลังดำเนินการ..." : "Buy now | ซื้อเลย"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Need a custom offer? | ต้องการข้อเสนอที่กำหนดเอง?</h2>
            <p className="mb-4 max-w-2xl mx-auto">
              Contact us for tailored solutions for larger fleets or special requirements.
              <br />
              ติดต่อเราสำหรับโซลูชันที่ปรับแต่งสำหรับกองยานพาหนะขนาดใหญ่หรือความต้องการพิเศษ
            </p>
            <Button variant="outline">Contact | ติดต่อ</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
