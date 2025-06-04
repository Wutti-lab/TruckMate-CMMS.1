
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types/user-roles";
import { isValidEmail } from "@/lib/utils";

export function SupabaseRegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      // Validation
      if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        throw new Error("All fields are required");
      }
      
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      if (!isValidEmail(email)) {
        throw new Error("Please enter a valid email address");
      }
      
      // Register with Supabase
      await register(email, password, {
        name,
        phone_number: phoneNumber,
        company,
        job_title: jobTitle,
        role: UserRole.FLEET_MANAGER
      });
      
      // Success
      toast({
        title: "Registration successful",
        description: "Please check your email to confirm your account."
      });
      navigate('/login');
      
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{t("createAccount")}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              placeholder={t("namePlaceholder")}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              placeholder={t("emailPlaceholder")}
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">{t("phoneNumber")}</Label>
            <Input
              id="phoneNumber"
              placeholder={t("phoneNumberPlaceholder")}
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">{t("company")}</Label>
            <Input
              id="company"
              placeholder={t("companyPlaceholder")}
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jobTitle">{t("jobTitle")}</Label>
            <Input
              id="jobTitle"
              placeholder={t("jobTitlePlaceholder")}
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              placeholder={t("passwordPlaceholder")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              placeholder={t("confirmPasswordPlaceholder")}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button disabled={isSubmitting} className="w-full bg-fleet-500 mt-4">
            {isSubmitting ? t("submitting") : t("register")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
