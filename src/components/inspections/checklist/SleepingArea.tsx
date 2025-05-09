
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SleepingArea() {
  const [checklistItems, setChecklistItems] = useState([
    { id: 'beds', label: 'Beds/Mattresses in good condition | เตียง/ที่นอนอยู่ในสภาพดี', checked: false },
    { id: 'capacity', label: 'Sleeping spaces for 2-4 people available | มีพื้นที่นอนสำหรับ 2-4 คน', checked: false },
    { id: 'clean', label: 'Area clean and sanitized | พื้นที่สะอาดและฆ่าเชื้อแล้ว', checked: false },
    { id: 'linen', label: 'Fresh linen available | มีผ้าปูที่นอนสะอาด', checked: false },
    { id: 'privacy', label: 'Privacy curtains functional | ม่านกั้นความเป็นส่วนตัวใช้งานได้', checked: false },
    { id: 'storage', label: 'Personal storage available | มีที่เก็บของส่วนตัว', checked: false },
    { id: 'lighting', label: 'Reading lights operational | ไฟอ่านหนังสือทำงานได้', checked: false },
    { id: 'ventilation', label: 'Proper ventilation | การระบายอากาศเหมาะสม', checked: false }
  ]);
  
  const [comments, setComments] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();
  
  const handleToggleCheck = (id: string) => {
    setChecklistItems(checklistItems.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };
  
  const handleSaveChanges = () => {
    const completed = checklistItems.filter(item => item.checked).length;
    const total = checklistItems.length;
    
    toast({
      title: "Inspection Updated | การตรวจสอบได้รับการปรับปรุง",
      description: `${completed} of ${total} items checked | ตรวจสอบ ${completed} จาก ${total} รายการ`
    });
  };
  
  const handleImageUpload = () => {
    // Mock image upload
    const newImage = `/placeholder.svg?text=Sleeping+Area+Image+${images.length + 1}`;
    setImages([...images, newImage]);
    
    toast({
      title: "Image Uploaded | อัปโหลดรูปภาพแล้ว",
      description: "Image has been added to the inspection | รูปภาพถูกเพิ่มเข้าไปในการตรวจสอบแล้ว"
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleeping Area | พื้นที่นอน</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Checklist Items | รายการตรวจสอบ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklistItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-2">
                  <Checkbox 
                    id={item.id} 
                    checked={item.checked} 
                    onCheckedChange={() => handleToggleCheck(item.id)} 
                  />
                  <Label htmlFor={item.id} className="text-sm leading-none pt-1">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Comments | ความคิดเห็น</h3>
            <Textarea
              placeholder="Add notes about the sleeping area condition... | เพิ่มบันทึกเกี่ยวกับสภาพพื้นที่นอน..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="h-24"
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Documentation | เอกสารประกอบ</h3>
            <div className="flex flex-wrap gap-3 mb-3">
              {images.map((image, index) => (
                <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden">
                  <img src={image} alt={`Sleeping area ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              
              {images.length === 0 && (
                <div className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-md border-gray-300 p-4">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-gray-400" />
                    <p className="mt-1 text-xs text-gray-500">No images uploaded | ยังไม่มีรูปภาพที่อัปโหลด</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={handleImageUpload} className="flex gap-2">
                <Camera size={16} />
                Add Photo | เพิ่มรูปภาพ
              </Button>
              
              <div className="relative">
                <Input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
                <Button variant="outline" className="flex gap-2">
                  <Upload size={16} />
                  Upload | อัปโหลด
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">
                  <span className="font-medium">Status: </span>
                  <span className="text-amber-600">In Progress | กำลังดำเนินการ</span>
                </p>
              </div>
              <div className="space-x-2">
                <Button variant="outline">Cancel | ยกเลิก</Button>
                <Button onClick={handleSaveChanges}>Save | บันทึก</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
