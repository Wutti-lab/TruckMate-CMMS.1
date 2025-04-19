
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Truck } from "lucide-react";

export function TransportRegulations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transport Regulations Bangkok | กฎระเบียบการขนส่งกรุงเทพ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Driving Time Restrictions | ข้อจำกัดเวลาขับขี่
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-5 w-5" />
                <h4 className="font-medium">6-Wheeler Truck | รถบรรทุก 6 ล้อ</h4>
              </div>
              <p className="text-sm">Prohibited on expressways and surface roads between: | ห้ามวิ่งบนทางด่วนและถนนระหว่าง:</p>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>06:00 - 09:00</li>
                <li>16:00 - 20:00</li>
              </ul>
            </div>

            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-5 w-5" />
                <h4 className="font-medium">10-Wheeler Trucks or larger | รถบรรทุก 10 ล้อขึ้นไป</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">On expressways prohibited between: | บนทางด่วนห้ามวิ่งระหว่าง:</p>
                  <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                    <li>06:00 - 09:00</li>
                    <li>15:00 - 21:00</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium">On surface roads prohibited between: | บนถนนห้ามวิ่งระหว่าง:</p>
                  <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                    <li>06:00 - 10:00</li>
                    <li>15:00 - 21:00</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Transport Time Notes | หมายเหตุเวลาขนส่ง</h3>
          <div className="p-4 bg-secondary rounded-lg text-sm space-y-2">
            <p>• Transport time varies by distance and traffic conditions | เวลาขนส่งแตกต่างกันตามระยะทางและสภาพการจราจร</p>
            <p>• Consider driving time restrictions in route planning | พิจารณาข้อจำกัดเวลาขับขี่ในการวางแผนเส้นทาง</p>
            <p>• Plan extra time for traffic jams and unforeseen events | วางแผนเวลาเพิ่มสำหรับรถติดและเหตุการณ์ที่ไม่คาดคิด</p>
            <p>• Be aware of local holidays and events | ระวังวันหยุดและกิจกรรมในท้องถิ่น</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
