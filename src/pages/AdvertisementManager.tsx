
import React, { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { BackToDashboard } from "@/components/layout/BackToDashboard";
import { toast } from "@/hooks/use-toast";
import AdForm from '@/components/advertisements/AdForm';
import AdPreview from '@/components/advertisements/AdPreview';
import AdTable from '@/components/advertisements/AdTable';
import { Advertisement } from '@/components/advertisements/types';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AdvertisementManager() {
  const { t } = useLanguage();
  
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    {
      id: "1",
      title: "ข้อเสนอพิเศษชิ้นส่วนยานพาหนะ",
      description: "ส่วนลด 20% สำหรับอะไหล่ทั้งหมดจนถึงสิ้นเดือน",
      bgColor: "bg-gradient-to-r from-sky-400 to-blue-500",
      link: "#",
      active: true
    },
    {
      id: "2",
      title: "TruckTracker Pro",
      description: "ปรับปรุงการติดตามยานพาหนะของคุณด้วยการอัปเกรดพรีเมียม",
      bgColor: "bg-gradient-to-r from-amber-300 to-orange-500",
      link: "#",
      active: true
    },
    {
      id: "3",
      title: "เวิร์กชอปการบำรุงรักษา",
      description: "ลงทะเบียนเข้าร่วมเวิร์กชอปออนไลน์ที่กำลังจะมาถึง",
      bgColor: "bg-gradient-to-r from-green-400 to-emerald-600",
      link: "#",
      active: true
    }
  ]);
  
  const [newAd, setNewAd] = useState<Omit<Advertisement, 'id' | 'active'>>({
    title: "",
    description: "",
    bgColor: "bg-gradient-to-r from-sky-400 to-blue-500",
    link: "",
    image: ""
  });
  
  const handleAddNewAd = () => {
    if (!newAd.title || !newAd.description) {
      toast({
        title: t("incompleteData"),
        description: t("fillRequiredFields"),
        variant: "destructive"
      });
      return;
    }
    
    const newAdWithId: Advertisement = {
      ...newAd,
      id: Date.now().toString(),
      active: true
    };
    
    setAdvertisements([...advertisements, newAdWithId]);
    setNewAd({
      title: "",
      description: "",
      bgColor: "bg-gradient-to-r from-sky-400 to-blue-500",
      link: "",
      image: ""
    });
    
    toast({
      title: t("adAdded"),
      description: t("newAdAddedSuccess")
    });
  };
  
  const toggleAdStatus = (id: string) => {
    setAdvertisements(advertisements.map(ad => 
      ad.id === id ? { ...ad, active: !ad.active } : ad
    ));
  };
  
  const deleteAd = (id: string) => {
    setAdvertisements(advertisements.filter(ad => ad.id !== id));
    toast({
      title: t("adDeleted"),
      description: t("adDeletedSuccess")
    });
  };
  
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <BackToDashboard />
        <div className="container mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{t("advertisementManager")}</h1>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <AdForm 
              newAd={newAd}
              setNewAd={setNewAd}
              onAddAd={handleAddNewAd}
            />
            <AdPreview ad={newAd} />
          </div>
          
          <AdTable 
            advertisements={advertisements}
            onToggleStatus={toggleAdStatus}
            onDelete={deleteAd}
          />
        </div>
      </main>
    </div>
  );
}
