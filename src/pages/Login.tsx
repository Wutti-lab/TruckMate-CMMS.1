
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Login() {
  const [activeTab, setActiveTab] = useState<string>("login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-fleet-50 to-white p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-fleet-500">TruckMate CMMS</h1>
          <p className="text-gray-600 mt-2">Flottenmanagement leicht gemacht</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Anmelden</TabsTrigger>
            <TabsTrigger value="register">Registrieren</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Anmelden</CardTitle>
                <CardDescription>
                  Melden Sie sich mit Ihren Zugangsdaten an
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <LoginForm />
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="link" size="sm" className="text-fleet-500">
                  Passwort vergessen?
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Registrieren</CardTitle>
                <CardDescription>
                  Erstellen Sie ein neues Konto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RegisterForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
