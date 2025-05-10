
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

export function MapLegend() {
  const { language } = useLanguage();
  
  return (
    <Card className="absolute right-4 bottom-20 w-auto">
      <CardContent className="p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>{extractLanguageText("Active | กำลังปฏิบัติงาน | Aktiv", language)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>{extractLanguageText("Inactive | ไม่ได้ปฏิบัติงาน | Inaktiv", language)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>{extractLanguageText("Problem | มีปัญหา | Problem", language)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
