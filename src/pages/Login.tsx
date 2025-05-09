
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const userCredentials = [
  { role: 'Admin', email: 'admin@truckmate.com', password: '123456' },
  { role: 'Fleet Manager', email: 'fleet@truckmate.com', password: '123456' },
  { role: 'Driver', email: 'driver@truckmate.com', password: '123456' },
  { role: 'Mechanic', email: 'mechanic@truckmate.com', password: '123456' },
  { role: 'Dispatcher', email: 'dispatcher@truckmate.com', password: '123456' },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome to TruckMate CMMS",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-fleet-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-fleet-900">
            TruckMate CMMS
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            ระบบจัดการยานพาหนะที่ง่ายดาย
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="p-4 border rounded-md bg-gray-50">
                <p className="text-sm font-medium mb-2">Test Accounts:</p>
                <div className="space-y-1 text-xs">
                  {userCredentials.map((cred, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="font-medium">{cred.role}:</span>
                      <span>{cred.email}</span>
                    </div>
                  ))}
                  <div className="border-t pt-1 mt-1">
                    <span className="font-medium">Password for all:</span>
                    <span className="ml-2">123456</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-fleet-600 hover:bg-fleet-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
              
              <div className="text-center w-full">
                <Link 
                  to="/pricing" 
                  className="text-fleet-600 hover:underline text-sm font-medium"
                >
                  View pricing plans | ดูแผนราคา
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
