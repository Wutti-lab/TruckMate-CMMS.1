
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import AdForm from '@/components/advertisements/AdForm';
import AdPreview from '@/components/advertisements/AdPreview';
import AdTable from '@/components/advertisements/AdTable';
import { Advertisement } from '@/components/advertisements/types';

export default function AdvertisementManager() {
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
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลในช่องที่จำเป็นทั้งหมด",
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
      title: "เพิ่มโฆษณาแล้ว",
      description: "โฆษณาใหม่ได้รับการเพิ่มเรียบร้อยแล้ว"
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
      title: "ลบโฆษณาแล้ว",
      description: "โฆษณาได้รับการลบเรียบร้อยแล้ว"
    });
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">ตัวจัดการโฆษณา</h1>
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
  );
}
