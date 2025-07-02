
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Lock } from 'lucide-react';

export default function SetNewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(language === 'de' ? 'Passwörter stimmen nicht überein' : 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError(language === 'de' ? 'Passwort muss mindestens 8 Zeichen haben' : 'Password must be at least 8 characters');
      return;
    }

    // Here you would normally handle password update
    navigate('/login', { 
      state: { 
        message: language === 'de' ? 'Passwort erfolgreich aktualisiert' : 'Password updated successfully' 
      } 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {language === 'de' ? 'Neues Passwort setzen' : 'Set New Password'}
          </CardTitle>
          <CardDescription className="text-center">
            {language === 'de' 
              ? 'Geben Sie Ihr neues Passwort ein'
              : 'Enter your new password'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">
                {language === 'de' ? 'Neues Passwort' : 'New Password'}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {language === 'de' ? 'Passwort bestätigen' : 'Confirm Password'}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            <Button type="submit" className="w-full">
              <Lock className="mr-2 h-4 w-4" />
              {language === 'de' ? 'Passwort aktualisieren' : 'Update Password'}
            </Button>
          </form>
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
