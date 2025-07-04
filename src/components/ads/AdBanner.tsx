
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdBannerProps {
  position?: 'top' | 'bottom';
}

export function AdBanner({ position = 'top' }: AdBannerProps) {
  const [currentAd, setCurrentAd] = useState(0);
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  
  // Example advertisements with translations
  const advertisements = {
    en: [
      {
        title: "Vehicle Parts Special Offer",
        description: "20% discount on all spare parts until the end of the month",
        bgColor: "bg-gradient-to-r from-sky-400 to-blue-500",
        link: "#",
        buttonText: "Learn More",
        image: ""
      },
      {
        title: "TruckTracker Pro",
        description: "Improve your fleet tracking with our premium upgrade",
        bgColor: "bg-gradient-to-r from-amber-300 to-orange-500",
        link: "#",
        buttonText: "Learn More",
        image: ""
      },
      {
        title: "Maintenance Workshop",
        description: "Sign up for our upcoming online workshop",
        bgColor: "bg-gradient-to-r from-green-400 to-emerald-600",
        link: "#",
        buttonText: "Learn More",
        image: ""
      }
    ],
    th: [
      {
        title: "ข้อเสนอพิเศษชิ้นส่วนยานพาหนะ",
        description: "ส่วนลด 20% สำหรับอะไหล่ทั้งหมดจนถึงสิ้นเดือน",
        bgColor: "bg-gradient-to-r from-sky-400 to-blue-500",
        link: "#",
        buttonText: "เรียนรู้เพิ่มเติม",
        image: ""
      },
      {
        title: "TruckTracker Pro",
        description: "ปรับปรุงการติดตามยานพาหนะของคุณด้วยการอัปเกรดพรีเมียม",
        bgColor: "bg-gradient-to-r from-amber-300 to-orange-500",
        link: "#",
        buttonText: "เรียนรู้เพิ่มเติม",
        image: ""
      },
      {
        title: "เวิร์กชอปการบำรุงรักษา",
        description: "ลงทะเบียนเข้าร่วมเวิร์กชอปออนไลน์ที่กำลังจะมาถึง",
        bgColor: "bg-gradient-to-r from-green-400 to-emerald-600",
        link: "#",
        buttonText: "เรียนรู้เพิ่มเติม",
        image: ""
      }
    ],
    de: [
      {
        title: "Fahrzeugteile Sonderangebot",
        description: "20% Rabatt auf alle Ersatzteile bis Ende des Monats",
        bgColor: "bg-gradient-to-r from-sky-400 to-blue-500",
        link: "#",
        buttonText: "Mehr erfahren",
        image: ""
      },
      {
        title: "TruckTracker Pro",
        description: "Verbessern Sie Ihre Flottenverfolgung mit unserem Premium-Upgrade",
        bgColor: "bg-gradient-to-r from-amber-300 to-orange-500",
        link: "#",
        buttonText: "Mehr erfahren",
        image: ""
      },
      {
        title: "Wartungsworkshop",
        description: "Melden Sie sich für unseren kommenden Online-Workshop an",
        bgColor: "bg-gradient-to-r from-green-400 to-emerald-600",
        link: "#",
        buttonText: "Mehr erfahren",
        image: ""
      }
    ]
  };

  // Get ads for current language or fall back to English
  const currentLanguageAds = advertisements[language as keyof typeof advertisements] || advertisements.en;
  
  // Rotate advertisements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % currentLanguageAds.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentLanguageAds.length]);

  const ad = currentLanguageAds[currentAd];

  return (
    <div className={`relative w-full ${ad.bgColor} text-primary-foreground p-3 shadow-md ${position === 'top' ? 'border-b' : 'border-t'} border-border`}>
      <div className="flex flex-col items-center text-center px-6">
        {ad.image && (
          <div className="mb-2">
            <img 
              src={ad.image} 
              alt={ad.title} 
              className="h-12 w-auto object-contain rounded"
            />
          </div>
        )}
        <h3 className="font-bold text-sm">{ad.title}</h3>
        <p className="text-xs mt-1">{ad.description}</p>
        <a 
          href={ad.link} 
          className="mt-2 text-xs bg-secondary/20 hover:bg-secondary/30 transition-colors px-3 py-1 rounded-full"
        >
          {ad.buttonText}
        </a>
      </div>
    </div>
  );
}
