import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface BackToDashboardProps {
  className?: string;
}

export function BackToDashboard({ className = "" }: BackToDashboardProps) {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <Button 
      variant="ghost" 
      size={isMobile ? "sm" : "default"}
      asChild
      className={`flex items-center gap-2 mb-4 ${className}`}
    >
      <Link to="/">
        <ArrowLeft className="h-4 w-4" />
        <span className={isMobile ? "text-sm" : ""}>
          {extractLanguageText("Zurück zum Dashboard | Back to Dashboard | กลับไปแดชบอร์ด", language)}
        </span>
      </Link>
    </Button>
  );
}