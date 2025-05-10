
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface AdBannerProps {
  position?: 'top' | 'bottom';
}

export function AdBanner({ position = 'top' }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAd, setCurrentAd] = useState(0);
  
  // Beispiel-Werbeanzeigen
  const advertisements = [
    {
      title: "Fahrzeugteile Sonderangebot",
      description: "20% Rabatt auf alle Ersatzteile bis Ende des Monats",
      bgColor: "bg-gradient-to-r from-sky-400 to-blue-500",
      link: "#"
    },
    {
      title: "TruckTracker Pro",
      description: "Verbessern Sie Ihre Flottenverfolgung mit unserem Premium-Upgrade",
      bgColor: "bg-gradient-to-r from-amber-300 to-orange-500",
      link: "#"
    },
    {
      title: "Wartungsworkshop",
      description: "Melden Sie sich für unseren kommenden Online-Workshop an",
      bgColor: "bg-gradient-to-r from-green-400 to-emerald-600",
      link: "#"
    }
  ];

  // Werbeanzeigen rotieren
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % advertisements.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isVisible, advertisements.length]);

  if (!isVisible) return null;

  const ad = advertisements[currentAd];

  return (
    <div className={`relative w-full ${ad.bgColor} text-white p-3 shadow-md ${position === 'top' ? 'border-b' : 'border-t'} border-slate-700`}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-1 top-1 text-white opacity-70 hover:opacity-100 hover:bg-white/10"
        onClick={() => setIsVisible(false)}
      >
        <X size={16} />
        <span className="sr-only">Werbung schließen</span>
      </Button>
      
      <div className="flex flex-col items-center text-center px-6">
        <h3 className="font-bold text-sm">{ad.title}</h3>
        <p className="text-xs mt-1">{ad.description}</p>
        <a 
          href={ad.link} 
          className="mt-2 text-xs bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full"
        >
          Mehr erfahren
        </a>
      </div>
    </div>
  );
}
