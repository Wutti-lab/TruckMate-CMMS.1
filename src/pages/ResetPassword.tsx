
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Mail } from 'lucide-react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle password reset
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {language === 'de' ? 'Passwort zurücksetzen' : 'Reset Password'}
          </CardTitle>
          <CardDescription className="text-center">
            {language === 'de' 
              ? 'Geben Sie Ihre E-Mail-Adresse ein, um einen Reset-Link zu erhalten'
              : 'Enter your email address to receive a reset link'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  {language === 'de' ? 'E-Mail-Adresse' : 'Email Address'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={language === 'de' ? 'ihre.email@beispiel.de' : 'your.email@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                {language === 'de' ? 'Reset-Link senden' : 'Send Reset Link'}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-green-600">
                {language === 'de' 
                  ? 'Reset-Link wurde gesendet!'
                  : 'Reset link sent!'
                }
              </div>
              <p className="text-sm text-gray-600">
                {language === 'de'
                  ? 'Überprüfen Sie Ihre E-Mails für weitere Anweisungen.'
                  : 'Check your email for further instructions.'
                }
              </p>
            </div>
          )}
          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-blue-600 hover:underline flex items-center justify-center">
              <ArrowLeft className="mr-1 h-4 w-4" />
              {language === 'de' ? 'Zurück zum Login' : 'Back to Login'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
