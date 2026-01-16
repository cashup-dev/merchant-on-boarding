"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
};

export default function LanguageToggle({ className }: Props) {
  const { i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <Button
        type="button"
        size="sm"
        variant={isId ? "primary" : "outline"}
        onClick={() => i18n.changeLanguage("id")}
      >
        ID
      </Button>
      <Button
        type="button"
        size="sm"
        variant={isId ? "outline" : "primary"}
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </Button>
    </div>
  );
}
