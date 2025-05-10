
import React from "react";
import { Languages } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-between">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              {language === 'en' ? 'English' : language === 'th' ? 'ไทย' : 'Deutsch'}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLanguageChange('th')}>
            ไทย (Thai)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLanguageChange('de')}>
            Deutsch (German)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
