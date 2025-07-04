
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Advertisement } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdPreviewProps {
  ad: Omit<Advertisement, 'id' | 'active'>;
}

const AdPreview: React.FC<AdPreviewProps> = ({ ad }) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("preview")}</CardTitle>
        <CardDescription>{t("adPreviewDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`${ad.bgColor} w-full text-primary-foreground p-3 rounded-md shadow-md`}>
          <div className="flex flex-col items-center text-center px-6 py-2">
            {ad.image && (
              <div className="mb-2">
                <img 
                  src={ad.image} 
                  alt={ad.title || t("adImage")} 
                  className="h-12 w-auto object-contain rounded"
                />
              </div>
            )}
            <h3 className="font-bold text-sm">{ad.title || t("adTitle")}</h3>
            <p className="text-xs mt-1">{ad.description || t("adDescription")}</p>
            <a 
              href={ad.link || "#"} 
              className="mt-2 text-xs bg-secondary/20 hover:bg-secondary/30 transition-colors px-3 py-1 rounded-full"
            >
              {t("learnMore")}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdPreview;
