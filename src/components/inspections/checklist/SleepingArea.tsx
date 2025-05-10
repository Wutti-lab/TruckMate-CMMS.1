
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
    { id: 'beds', label: 'Betten/Matratzen in gutem Zustand', checked: false },
    { id: 'capacity', label: 'Schlafplätze für 2-4 Personen verfügbar', checked: false },
    { id: 'clean', label: 'Bereich gereinigt und desinfiziert', checked: false },
    { id: 'linen', label: 'Frische Bettwäsche verfügbar', checked: false },
    { id: 'privacy', label: 'Vorhänge für Privatsphäre funktionsfähig', checked: false },
    { id: 'storage', label: 'Persönlicher Stauraum vorhanden', checked: false },
    { id: 'lighting', label: 'Leselampen funktionsfähig', checked: false },
    { id: 'ventilation', label: 'Ausreichende Belüftung', checked: false }
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
      title: "Inspektion aktualisiert",
      description: `${completed} von ${total} Punkten überprüft`
    });
  };
  
  const handleImageUpload = () => {
    // Mock image upload
    const newImage = `/placeholder.svg?text=Schlafbereich+Bild+${images.length + 1}`;
    setImages([...images, newImage]);
    
    toast({
      title: "Bild hochgeladen",
      description: "Das Bild wurde zur Inspektion hinzugefügt"
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Schlafbereich</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Checkliste</h3>
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
            <h3 className="text-sm font-medium mb-3">Kommentare</h3>
            <Textarea
              placeholder="Notizen zum Zustand des Schlafbereichs hinzufügen..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="h-24"
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Dokumentation</h3>
            <div className="flex flex-wrap gap-3 mb-3">
              {images.map((image, index) => (
                <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden">
                  <img src={image} alt={`Schlafbereich ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              
              {images.length === 0 && (
                <div className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-md border-gray-300 p-4">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-gray-400" />
                    <p className="mt-1 text-xs text-gray-500">Keine Bilder hochgeladen</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={handleImageUpload} className="flex gap-2">
                <Camera size={16} />
                Foto hinzufügen
              </Button>
              
              <div className="relative">
                <Input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
                <Button variant="outline" className="flex gap-2">
                  <Upload size={16} />
                  Hochladen
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">
                  <span className="font-medium">Status: </span>
                  <span className="text-amber-600">In Bearbeitung</span>
                </p>
              </div>
              <div className="space-x-2">
                <Button variant="outline">Abbrechen</Button>
                <Button onClick={handleSaveChanges}>Speichern</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
