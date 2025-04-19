
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Activity, AlertTriangle, Battery, Car, Clock, Fuel, MapPin, ThumbsUp, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Willkommen zurück, hier ist der Überblick Ihrer Flotte.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Aktive Fahrzeuge</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18/24</div>
              <p className="text-xs text-muted-foreground">
                75% der Flotte ist aktiv
              </p>
              <div className="mt-4 h-1 w-full bg-gray-200 rounded-full">
                <div className="h-1 bg-green-500 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Gesamtkilometer</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.458 km</div>
              <p className="text-xs text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> 2,5% höher als letzten Monat
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Wartungsbedarf</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-orange-500">
                3 Fahrzeuge benötigen Wartung
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Flotteneffizienz</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-green-500">
                Sehr gut
              </p>
              <div className="mt-4 h-1 w-full bg-gray-200 rounded-full">
                <div className="h-1 bg-green-500 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 mt-6 md:grid-cols-12">
          <Card className="col-span-12 md:col-span-8">
            <CardHeader>
              <CardTitle>Fahrzeugübersicht</CardTitle>
              <CardDescription>Aktuelle Statusinformationen Ihrer Fahrzeuge</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid gap-6 p-4 md:grid-cols-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="rounded-md bg-fleet-100 p-1.5">
                          <Car className="h-4 w-4 text-fleet-500" />
                        </div>
                        <p className="text-sm font-medium">B-FR {index}23</p>
                        {index !== 3 ? (
                          <div className="ml-auto rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-600">
                            Aktiv
                          </div>
                        ) : (
                          <div className="ml-auto rounded-full bg-orange-100 px-1.5 py-0.5 text-xs text-orange-600">
                            Wartung
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>Berlin{index === 4 ? ", Prenzlauer Berg" : index === 3 ? ", Werkstatt" : ", Mitte"}</span>
                      </div>
                      <div className="mt-2 flex gap-2 text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Fuel className="h-3 w-3" />
                          <span>{70 + index * 5}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Battery className="h-3 w-3" />
                          <span>{80 + index * 5}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>3.{index}h</span>
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
              <CardDescription>Kürzlich stattgefundene Ereignisse</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { title: "Fahrzeug B-FR 323 hat Zielort erreicht", time: "vor 5 Minuten" },
                  { title: "Neue Wartungsanfrage für B-FR 423", time: "vor 35 Minuten" },
                  { title: "Batterieladung bei B-FR 123 unter 30%", time: "vor 1 Stunde" },
                  { title: "Fahrer M. Schmidt hat Schicht begonnen", time: "vor 2 Stunden" },
                  { title: "Routenänderung für B-FR 223 genehmigt", time: "vor 3 Stunden" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="rounded-full bg-fleet-100 p-1">
                      <Activity className="h-3 w-3 text-fleet-500" />
                    </div>
                    <div className="space-y-1">
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
