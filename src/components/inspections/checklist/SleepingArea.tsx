
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from "@/contexts/LanguageContext";

export function SleepingArea() {
  const { t } = useLanguage();
  
  const [checklistItems, setChecklistItems] = useState([
    { id: 'beds', label: 'bedMattressCondition', checked: false },
    { id: 'capacity', label: 'sleepingCapacity', checked: false },
    { id: 'clean', label: 'areaCleanedDisinfected', checked: false },
    { id: 'linen', label: 'freshBedding', checked: false },
    { id: 'privacy', label: 'privacyCurtains', checked: false },
    { id: 'storage', label: 'personalStorage', checked: false },
    { id: 'lighting', label: 'readingLamps', checked: false },
    { id: 'ventilation', label: 'adequateVentilation', checked: false }
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
      title: t("processingStatus"),
      description: `${completed} / ${total}`
    });
  };
  
  const handleImageUpload = () => {
    // Mock image upload
    const newImage = `/placeholder.svg?text=${t("sleepingArea")}+${images.length + 1}`;
    setImages([...images, newImage]);
    
    toast({
      title: t("uploadImage"),
      description: t("adCreated")
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("sleepingArea")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">{t("maintenanceChecklist")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklistItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-2">
                  <Checkbox 
                    id={item.id} 
                    checked={item.checked} 
                    onCheckedChange={() => handleToggleCheck(item.id)} 
                  />
                  <Label htmlFor={item.id} className="text-sm leading-none pt-1">
                    {t(item.label)}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">{t("comments")}</h3>
            <Textarea
              placeholder={t("notesAboutSleepingArea")}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="h-24"
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">{t("documentation")}</h3>
            <div className="flex flex-wrap gap-3 mb-3">
              {images.map((image, index) => (
                <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden">
                  <img src={image} alt={`${t("sleepingArea")} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              
              {images.length === 0 && (
                <div className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-md border-gray-300 p-4">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-gray-400" />
                    <p className="mt-1 text-xs text-gray-500">{t("noImagesUploaded")}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={handleImageUpload} className="flex gap-2">
                <Camera size={16} />
                {t("addPhoto")}
              </Button>
              
              <div className="relative">
                <Input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
                <Button variant="outline" className="flex gap-2">
                  <Upload size={16} />
                  {t("upload")}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">
                  <span className="font-medium">{t("status")}: </span>
                  <span className="text-amber-600">{t("processing")}</span>
                </p>
              </div>
              <div className="space-x-2">
                <Button variant="outline">{t("cancel")}</Button>
                <Button onClick={handleSaveChanges}>{t("save")}</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
