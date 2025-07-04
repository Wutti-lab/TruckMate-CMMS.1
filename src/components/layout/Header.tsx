
import { useLanguage } from "@/contexts/LanguageContext";
import { PageTitle } from "./PageTitle";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { HeaderProfile } from "./HeaderProfile";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="border-b bg-background p-4">
      <div className="flex items-center justify-between">
        <PageTitle />
        <div className="flex items-center gap-3">
          <NotificationsDropdown />
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
}
