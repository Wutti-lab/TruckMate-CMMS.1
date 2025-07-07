import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Plus,
  Trash2,
  Edit,
  GripVertical,
  Clock,
  AlertCircle,
  CheckCircle,
  Target
} from 'lucide-react';
import { useLanguage, extractLanguageText } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface RouteWaypoint {
  id: string;
  address: string;
  coordinates: [number, number];
  priority: 'high' | 'medium' | 'low';
  timeWindow?: {
    start: string;
    end: string;
  };
  serviceTime: number; // minutes
  notes?: string;
  isCompleted?: boolean;
}

interface WaypointManagerProps {
  waypoints: RouteWaypoint[];
  onWaypointsChange: (waypoints: RouteWaypoint[]) => void;
}

export function WaypointManager({ waypoints, onWaypointsChange }: WaypointManagerProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingWaypoint, setEditingWaypoint] = useState<RouteWaypoint | null>(null);
  const [newWaypoint, setNewWaypoint] = useState<Partial<RouteWaypoint>>({
    address: '',
    priority: 'medium',
    serviceTime: 15,
    coordinates: [100.5332, 13.7244]
  });

  const addWaypoint = () => {
    if (!newWaypoint.address?.trim()) {
      toast({
        title: extractLanguageText("Error | Fehler", language),
        description: extractLanguageText("Please enter an address | Bitte geben Sie eine Adresse ein", language),
        variant: "destructive"
      });
      return;
    }

    const waypoint: RouteWaypoint = {
      id: `wp_${Date.now()}`,
      address: newWaypoint.address,
      coordinates: newWaypoint.coordinates || [100.5332, 13.7244],
      priority: newWaypoint.priority || 'medium',
      serviceTime: newWaypoint.serviceTime || 15,
      timeWindow: newWaypoint.timeWindow,
      notes: newWaypoint.notes,
      isCompleted: false
    };

    onWaypointsChange([...waypoints, waypoint]);
    setNewWaypoint({
      address: '',
      priority: 'medium',
      serviceTime: 15,
      coordinates: [100.5332, 13.7244]
    });
    setShowAddDialog(false);

    toast({
      title: extractLanguageText("Waypoint Added | Wegpunkt hinzugefügt", language),
      description: extractLanguageText("New waypoint has been added | Neuer Wegpunkt wurde hinzugefügt", language)
    });
  };

  const updateWaypoint = (updatedWaypoint: RouteWaypoint) => {
    onWaypointsChange(waypoints.map(wp => 
      wp.id === updatedWaypoint.id ? updatedWaypoint : wp
    ));
    setEditingWaypoint(null);
    
    toast({
      title: extractLanguageText("Waypoint Updated | Wegpunkt aktualisiert", language),
      description: extractLanguageText("Waypoint has been updated | Wegpunkt wurde aktualisiert", language)
    });
  };

  const removeWaypoint = (id: string) => {
    onWaypointsChange(waypoints.filter(wp => wp.id !== id));
    toast({
      title: extractLanguageText("Waypoint Removed | Wegpunkt entfernt", language),
      description: extractLanguageText("Waypoint has been removed | Wegpunkt wurde entfernt", language)
    });
  };

  const toggleWaypointComplete = (id: string) => {
    onWaypointsChange(waypoints.map(wp => 
      wp.id === id ? { ...wp, isCompleted: !wp.isCompleted } : wp
    ));
  };

  const moveWaypoint = (fromIndex: number, toIndex: number) => {
    const newWaypoints = [...waypoints];
    const [movedItem] = newWaypoints.splice(fromIndex, 1);
    newWaypoints.splice(toIndex, 0, movedItem);
    onWaypointsChange(newWaypoints);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-3 w-3" />;
      case 'medium': return <Target className="h-3 w-3" />;
      case 'low': return <CheckCircle className="h-3 w-3" />;
      default: return <Target className="h-3 w-3" />;
    }
  };

  const WaypointDialog = ({ waypoint, isEdit = false }: { waypoint?: RouteWaypoint; isEdit?: boolean }) => {
    const [formData, setFormData] = useState<Partial<RouteWaypoint>>(
      waypoint || newWaypoint
    );

    const handleSave = () => {
      if (isEdit && waypoint) {
        updateWaypoint({ ...waypoint, ...formData } as RouteWaypoint);
      } else {
        setNewWaypoint(formData);
        addWaypoint();
      }
    };

    return (
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit 
              ? extractLanguageText("Edit Waypoint | Wegpunkt bearbeiten", language)
              : extractLanguageText("Add Waypoint | Wegpunkt hinzufügen", language)
            }
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{extractLanguageText("Address | Adresse", language)}</Label>
            <Input
              value={formData.address || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder={extractLanguageText("Enter address | Adresse eingeben", language)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{extractLanguageText("Priority | Priorität", language)}</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      {extractLanguageText("High | Hoch", language)}
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      {extractLanguageText("Medium | Mittel", language)}
                    </div>
                  </SelectItem>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      {extractLanguageText("Low | Niedrig", language)}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{extractLanguageText("Service Time (min) | Servicezeit (Min)", language)}</Label>
              <Input
                type="number"
                value={formData.serviceTime || 15}
                onChange={(e) => setFormData(prev => ({ ...prev, serviceTime: parseInt(e.target.value) || 15 }))}
                min="1"
                max="480"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{extractLanguageText("Time Window Start | Zeitfenster Start", language)}</Label>
              <Input
                type="time"
                value={formData.timeWindow?.start || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  timeWindow: { ...prev.timeWindow, start: e.target.value, end: prev.timeWindow?.end || '' }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>{extractLanguageText("Time Window End | Zeitfenster Ende", language)}</Label>
              <Input
                type="time"
                value={formData.timeWindow?.end || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  timeWindow: { ...prev.timeWindow, end: e.target.value, start: prev.timeWindow?.start || '' }
                }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{extractLanguageText("Notes | Notizen", language)}</Label>
            <Input
              value={formData.notes || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder={extractLanguageText("Optional notes | Optionale Notizen", language)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              {isEdit 
                ? extractLanguageText("Update | Aktualisieren", language)
                : extractLanguageText("Add | Hinzufügen", language)
              }
            </Button>
            <Button variant="outline" onClick={() => isEdit ? setEditingWaypoint(null) : setShowAddDialog(false)}>
              {extractLanguageText("Cancel | Abbrechen", language)}
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {extractLanguageText("Waypoint Manager | Wegpunkt-Manager", language)}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {waypoints.length} {extractLanguageText("stops | Stops", language)}
            </Badge>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  {extractLanguageText("Add | Hinzufügen", language)}
                </Button>
              </DialogTrigger>
              <WaypointDialog />
            </Dialog>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {waypoints.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>{extractLanguageText("No waypoints added yet | Noch keine Wegpunkte hinzugefügt", language)}</p>
            <p className="text-sm">{extractLanguageText("Click 'Add' to create your first waypoint | Klicken Sie auf 'Hinzufügen' für den ersten Wegpunkt", language)}</p>
          </div>
        ) : (
          waypoints.map((waypoint, index) => (
            <div 
              key={waypoint.id} 
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                waypoint.isCompleted ? 'bg-muted/50 opacity-75' : 'bg-background'
              }`}
            >
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {index + 1}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={getPriorityColor(waypoint.priority)} className="flex items-center gap-1">
                    {getPriorityIcon(waypoint.priority)}
                    {waypoint.priority.toUpperCase()}
                  </Badge>
                  {waypoint.timeWindow && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {waypoint.timeWindow.start}-{waypoint.timeWindow.end}
                    </Badge>
                  )}
                </div>
                <p className="font-medium text-sm truncate">{waypoint.address}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{waypoint.serviceTime}min</span>
                  {waypoint.coordinates && (
                    <span>{waypoint.coordinates[1].toFixed(4)}, {waypoint.coordinates[0].toFixed(4)}</span>
                  )}
                </div>
                {waypoint.notes && (
                  <p className="text-xs text-muted-foreground mt-1">{waypoint.notes}</p>
                )}
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleWaypointComplete(waypoint.id)}
                  className={waypoint.isCompleted ? 'text-green-600' : ''}
                >
                  <CheckCircle className={`h-4 w-4 ${waypoint.isCompleted ? 'fill-current' : ''}`} />
                </Button>
                <Dialog open={editingWaypoint?.id === waypoint.id} onOpenChange={(open) => !open && setEditingWaypoint(null)}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingWaypoint(waypoint)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <WaypointDialog waypoint={waypoint} isEdit />
                </Dialog>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWaypoint(waypoint.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}

        {waypoints.length > 0 && (
          <div className="pt-3 border-t">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                {extractLanguageText("Total service time | Gesamte Servicezeit", language)}: 
                {waypoints.reduce((sum, wp) => sum + wp.serviceTime, 0)}min
              </span>
              <span>
                {waypoints.filter(wp => wp.isCompleted).length}/{waypoints.length} {extractLanguageText("completed | abgeschlossen", language)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}