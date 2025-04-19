
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Activity, AlertTriangle, Battery, Car, Clock, AreaChart, Fuel, MapPin, ThumbsUp, TrendingUp, Users, Wrench } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">TruckMate CMMS Dashboard</h1>
          <p className="text-muted-foreground">Willkommen zurück, hier ist ein Überblick über Ihre Flotte</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Flottenstatus</CardTitle>
              <Car className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18/24</div>
              <div className="flex items-center gap-2 mt-2">
                <Progress value={75} className="h-2" />
                <span className="text-xs text-muted-foreground">75%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                18 Fahrzeuge sind im Einsatz
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Kraftstoffeffizienz</CardTitle>
              <Fuel className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.2 L/100km</div>
              <div className="flex items-center text-xs text-green-500 mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>5% besser als letzten Monat</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Fahrerstatus</CardTitle>
              <Users className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15/20</div>
              <p className="text-xs text-muted-foreground mt-2">
                15 Fahrer sind im Dienst
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs">75% Verfügbarkeit</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Wartungsstatus</CardTitle>
              <Wrench className="h-4 w-4 text-fleet-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <div className="flex items-center text-orange-500 mt-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span className="text-xs">Wartung ausstehend</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 mt-6 md:grid-cols-12">
          <Card className="col-span-12 md:col-span-8">
            <CardHeader>
              <CardTitle>Flottenübersicht</CardTitle>
              <CardDescription>Aktuelle Fahrzeugstatus</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="flex flex-col gap-2 p-3 rounded-lg bg-muted/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-md bg-fleet-100 p-1.5">
                            <Car className="h-4 w-4 text-fleet-500" />
                          </div>
                          <span className="font-medium">B-FR {index}23</span>
                        </div>
                        <div className={`px-2 py-0.5 rounded-full text-xs ${
                          index === 3 
                            ? "bg-orange-100 text-orange-600" 
                            : "bg-green-100 text-green-600"
                        }`}>
                          {index === 3 ? "Wartung" : "Aktiv"}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>Berlin{index === 4 ? ", Marzahn" : index === 3 ? ", Werkstatt" : ", Mitte"}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Fuel className="h-3 w-3" />
                          <span>{70 + index * 5}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Battery className="h-3 w-3" />
                          <span>{80 + index * 5}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{3 + index}.2 Std.</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-12 md:col-span-4">
            <CardHeader>
              <CardTitle>Letzte Aktivitäten</CardTitle>
              <CardDescription>Echtzeit-Updates der Flotte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Fahrzeug B-FR 323 am Ziel angekommen",
                    time: "vor 5 Minuten",
                    icon: MapPin,
                    color: "text-green-500",
                  },
                  {
                    title: "Neue Wartungsanfrage für B-FR 423",
                    time: "vor 35 Minuten",
                    icon: Wrench,
                    color: "text-orange-500",
                  },
                  {
                    title: "Niedriger Kraftstoff in B-FR 123",
                    time: "vor 1 Stunde",
                    icon: Fuel,
                    color: "text-red-500",
                  },
                  {
                    title: "Fahrer M. Schmidt beginnt Schicht",
                    time: "vor 2 Stunden",
                    icon: Users,
                    color: "text-fleet-500",
                  },
                  {
                    title: "Route aktualisiert für B-FR 223",
                    time: "vor 3 Stunden",
                    icon: MapPin,
                    color: "text-blue-500",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`rounded-full p-1.5 ${activity.color} bg-opacity-10`}>
                      <activity.icon className={`h-3 w-3 ${activity.color}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
