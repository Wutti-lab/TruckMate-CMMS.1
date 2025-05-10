
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

interface Advertisement {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  link: string;
  active: boolean;
}

export default function AdvertisementManager() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    {
      id: "1",
      title: "Fahrzeugteile Sonderangebot",
      description: "20% Rabatt auf alle Ersatzteile bis Ende des Monats",
      bgColor: "bg-gradient-to-r from-sky-400 to-blue-500",
      link: "#",
      active: true
    },
    {
      id: "2",
      title: "TruckTracker Pro",
      description: "Verbessern Sie Ihre Flottenverfolgung mit unserem Premium-Upgrade",
      bgColor: "bg-gradient-to-r from-amber-300 to-orange-500",
      link: "#",
      active: true
    },
    {
      id: "3",
      title: "Wartungsworkshop",
      description: "Melden Sie sich für unseren kommenden Online-Workshop an",
      bgColor: "bg-gradient-to-r from-green-400 to-emerald-600",
      link: "#",
      active: true
    }
  ]);
  
  const [newAd, setNewAd] = useState<Omit<Advertisement, 'id' | 'active'>>({
    title: "",
    description: "",
    bgColor: "bg-gradient-to-r from-sky-400 to-blue-500",
    link: ""
  });
  
  const colorOptions = [
    { value: "bg-gradient-to-r from-sky-400 to-blue-500", label: "Blau" },
    { value: "bg-gradient-to-r from-amber-300 to-orange-500", label: "Orange" },
    { value: "bg-gradient-to-r from-green-400 to-emerald-600", label: "Grün" },
    { value: "bg-gradient-to-r from-purple-400 to-pink-500", label: "Lila" },
    { value: "bg-gradient-to-r from-red-400 to-rose-500", label: "Rot" }
  ];
  
  const handleAddNewAd = () => {
    if (!newAd.title || !newAd.description) {
      toast({
        title: "Fehlende Informationen",
        description: "Bitte füllen Sie alle erforderlichen Felder aus.",
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
      link: ""
    });
    
    toast({
      title: "Werbung hinzugefügt",
      description: "Die neue Werbeanzeige wurde erfolgreich hinzugefügt."
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
      title: "Werbung gelöscht",
      description: "Die Werbeanzeige wurde erfolgreich gelöscht."
    });
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Werbeanzeigen-Manager</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Neue Werbeanzeige erstellen</CardTitle>
            <CardDescription>Fügen Sie eine neue Werbeanzeige hinzu, die in der App angezeigt wird.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titel</Label>
              <Input 
                id="title" 
                value={newAd.title} 
                onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                placeholder="Titel der Werbeanzeige"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea 
                id="description" 
                value={newAd.description}
                onChange={(e) => setNewAd({...newAd, description: e.target.value})}
                placeholder="Kurze Beschreibung"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="link">Link</Label>
              <Input 
                id="link" 
                value={newAd.link} 
                onChange={(e) => setNewAd({...newAd, link: e.target.value})}
                placeholder="URL für die Werbeanzeige"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">Hintergrundfarbe</Label>
              <Select 
                value={newAd.bgColor} 
                onValueChange={(value) => setNewAd({...newAd, bgColor: value})}
              >
                <SelectTrigger id="color">
                  <SelectValue placeholder="Wählen Sie eine Farbe" />
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
              Werbeanzeige hinzufügen
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vorschau</CardTitle>
            <CardDescription>So wird Ihre Werbeanzeige aussehen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`${newAd.bgColor} w-full text-white p-3 rounded-md shadow-md`}>
              <div className="flex flex-col items-center text-center px-6 py-2">
                <h3 className="font-bold text-sm">{newAd.title || "Werbetitel"}</h3>
                <p className="text-xs mt-1">{newAd.description || "Werbebeschreibung"}</p>
                <a 
                  href={newAd.link || "#"} 
                  className="mt-2 text-xs bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full"
                >
                  Mehr erfahren
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Werbeanzeigen verwalten</CardTitle>
          <CardDescription>Liste aller vorhandenen Werbeanzeigen</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titel</TableHead>
                <TableHead>Beschreibung</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advertisements.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="font-medium">{ad.title}</TableCell>
                  <TableCell>{ad.description}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${ad.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {ad.active ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleAdStatus(ad.id)}
                    >
                      {ad.active ? 'Deaktivieren' : 'Aktivieren'}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteAd(ad.id)}
                    >
                      Löschen
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
