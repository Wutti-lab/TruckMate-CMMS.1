
import { FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function ReportsHeader() {
  const { t, language } = useLanguage();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FileText className="h-8 w-8 text-fleet-600" />
            {language === 'de' ? 'Berichte & Analysen' : language === 'th' ? 'รายงานและการวิเคราะห์' : 'Reports & Analytics'}
          </h1>
          <p className="text-gray-600">
            {language === 'de' 
              ? 'Umfassende Analysen und Berichte für Ihre Flotte' 
              : language === 'th' 
              ? 'การวิเคราะห์และรายงานที่ครอบคลุมสำหรับกองยานพาหนะของคุณ'
              : 'Comprehensive analytics and reports for your fleet'
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {language === 'de' ? 'Datumsbereich' : language === 'th' ? 'ช่วงวันที่' : 'Date Range'}
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            {language === 'de' ? 'Exportieren' : language === 'th' ? 'ส่งออก' : 'Export'}
          </Button>
        </div>
      </div>
    </div>
  );
}
