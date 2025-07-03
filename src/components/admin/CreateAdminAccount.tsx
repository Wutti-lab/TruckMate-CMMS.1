import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

export function CreateAdminAccount() {
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const createAdminAccount = async () => {
    setIsCreating(true);
    setResult(null);

    try {
      // Sign up the admin user
      const { data, error } = await supabase.auth.signUp({
        email: 'wuphaa@gmail.com',
        password: '123456',
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: 'Admin User',
            role: 'admin',
            company: 'TruckMate CMMS',
            job_title: 'System Administrator'
          }
        }
      });

      if (error) {
        setResult({ success: false, message: error.message });
      } else {
        setResult({ 
          success: true, 
          message: 'Admin account created successfully! Email: wuphaa@gmail.com, Password: 123456' 
        });
      }
    } catch (error: any) {
      setResult({ success: false, message: error.message });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Admin Account erstellen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p><strong>Email:</strong> wuphaa@gmail.com</p>
          <p><strong>Passwort:</strong> 123456</p>
          <p><strong>Rolle:</strong> Administrator</p>
        </div>

        <Button 
          onClick={createAdminAccount}
          disabled={isCreating}
          className="w-full"
        >
          {isCreating ? 'Erstelle...' : 'Admin Account erstellen'}
        </Button>

        {result && (
          <Alert variant={result.success ? 'default' : 'destructive'}>
            {result.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}