
import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { X } from 'lucide-react';
import { Advertisement, colorOptions } from './types';

interface AdFormProps {
  newAd: Omit<Advertisement, 'id' | 'active'>;
  setNewAd: React.Dispatch<React.SetStateAction<Omit<Advertisement, 'id' | 'active'>>>;
  onAddAd: () => void;
}

const AdForm: React.FC<AdFormProps> = ({ newAd, setNewAd, onAddAd }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
          onClick={onAddAd}
          className="w-full"
        >
          เพิ่มโฆษณา
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdForm;
