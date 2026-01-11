"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");

  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
      <Button
        type="button"
        size="sm"
        variant={isId ? "default" : "outline"}
        onClick={() => i18n.changeLanguage("id")}
      >
        ID
      </Button>
      <Button
        type="button"
        size="sm"
        variant={isId ? "outline" : "default"}
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </Button>
    </div>
  );
}
