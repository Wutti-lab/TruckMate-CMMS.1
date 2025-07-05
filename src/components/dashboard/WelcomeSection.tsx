
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface WelcomeSectionProps {
  currentTime: Date;
}

export function WelcomeSection({ currentTime }: WelcomeSectionProps) {
  const { profile } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {t("welcomeBack")}, {profile?.full_name || "User"}!
      </h1>
      <p className="text-gray-600">
        {t("lastUpdated")}: {currentTime.toLocaleString()}
      </p>
    </div>
  );
}
