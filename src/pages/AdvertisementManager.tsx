
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { X } from 'lucide-react';

interface Advertisement {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  link: string;
  active: boolean;
  image?: string;
}

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

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const colorOptions = [
    { value: "bg-gradient-to-r from-sky-400 to-blue-500", label: "สีฟ้า" },
    { value: "bg-gradient-to-r from-amber-300 to-orange-500", label: "สีส้ม" },
    { value: "bg-gradient-to-r from-green-400 to-emerald-600", label: "สีเขียว" },
    { value: "bg-gradient-to-r from-purple-400 to-pink-500", label: "สีม่วง" },
    { value: "bg-gradient-to-r from-red-400 to-rose-500", label: "สีแดง" }
  ];
  
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
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // ตรวจสอบขนาดไฟล์ (สูงสุด 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "ขนาดรูปภาพใหญ่เกินไป",
        description: "ขนาดรูปภาพควรมีขนาดไม่เกิน 2MB",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // สร้างตัวอย่างภาพและตรวจสอบขนาด
        const img = new Image();
        img.onload = () => {
          if (img.width > 1200 || img.height > 800) {
            toast({
              title: "ขนาดรูปภาพใหญ่เกินไป",
              description: "ขนาดภาพที่แนะนำ: ไม่เกิน 1200x800 พิกเซล",
              variant: "destructive"
            });
          }
          
          setNewAd({...newAd, image: event.target?.result as string});
        };
        img.src = event.target?.result as string;
      }
    };
    reader.readAsDataURL(file);
  };
  
  const removeImage = () => {
    setNewAd({...newAd, image: ""});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">ตัวจัดการโฆษณา</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>สร้างโฆษณาใหม่</CardTitle>
            <CardDescription>เพิ่มโฆษณาใหม่ที่จะแสดงในแอพ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">หัวข้อ</Label>
              <Input 
                id="title" 
                value={newAd.title} 
                onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                placeholder="หัวข้อของโฆษณา"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">คำอธิบาย</Label>
              <Textarea 
                id="description" 
                value={newAd.description}
                onChange={(e) => setNewAd({...newAd, description: e.target.value})}
                placeholder="คำอธิบายสั้นๆ"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="link">ลิงก์</Label>
              <Input 
                id="link" 
                value={newAd.link} 
                onChange={(e) => setNewAd({...newAd, link: e.target.value})}
                placeholder="URL สำหรับโฆษณา"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">รูปภาพ (ไม่จำเป็น)</Label>
              <div className="flex flex-col gap-2">
                <Input
                  ref={fileInputRef}
                  id="image"
                  type="file"
                  accept="image/jpeg, image/png, image/gif, image/webp"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
                <div className="text-xs text-gray-500">
                  ขนาดที่แนะนำ: ไม่เกิน 1200x800 พิกเซล, ขนาดไม่เกิน 2MB, รูปแบบ: JPG, PNG, GIF, WebP
                </div>
                
                {newAd.image && (
                  <div className="relative mt-2 border rounded p-2">
                    <button 
                      onClick={removeImage}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      type="button"
                    >
                      <X size={14} />
                    </button>
                    <img 
                      src={newAd.image} 
                      alt="ตัวอย่าง" 
                      className="h-32 w-auto object-contain mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">สีพื้นหลัง</Label>
              <Select 
                value={newAd.bgColor} 
                onValueChange={(value) => setNewAd({...newAd, bgColor: value})}
              >
                <SelectTrigger id="color">
                  <SelectValue placeholder="เลือกสี" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleAddNewAd}
              className="w-full"
            >
              เพิ่มโฆษณา
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ตัวอย่าง</CardTitle>
            <CardDescription>โฆษณาของคุณจะมีลักษณะแบบนี้</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`${newAd.bgColor} w-full text-white p-3 rounded-md shadow-md`}>
              <div className="flex flex-col items-center text-center px-6 py-2">
                {newAd.image && (
                  <div className="mb-2">
                    <img 
                      src={newAd.image} 
                      alt={newAd.title || "ภาพโฆษณา"} 
                      className="h-12 w-auto object-contain rounded"
                    />
                  </div>
                )}
                <h3 className="font-bold text-sm">{newAd.title || "ชื่อโฆษณา"}</h3>
                <p className="text-xs mt-1">{newAd.description || "รายละเอียดโฆษณา"}</p>
                <a 
                  href={newAd.link || "#"} 
                  className="mt-2 text-xs bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full"
                >
                  เรียนรู้เพิ่มเติม
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>จัดการโฆษณา</CardTitle>
          <CardDescription>รายการโฆษณาทั้งหมดที่มีอยู่</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>หัวข้อ</TableHead>
                <TableHead>คำอธิบาย</TableHead>
                <TableHead>รูปภาพ</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead className="text-right">การดำเนินการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advertisements.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="font-medium">{ad.title}</TableCell>
                  <TableCell>{ad.description}</TableCell>
                  <TableCell>
                    {ad.image ? (
                      <img 
                        src={ad.image} 
                        alt={ad.title} 
                        className="h-8 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${ad.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {ad.active ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleAdStatus(ad.id)}
                    >
                      {ad.active ? 'ปิดการใช้งาน' : 'เปิดการใช้งาน'}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteAd(ad.id)}
                    >
                      ลบ
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
