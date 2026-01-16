"use client";

import React from "react";
import { cn } from "@/lib/utils";

type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
  listClassName?: string;
};

export function Tabs({ tabs, value, onChange, className, listClassName }: TabsProps) {
  return (
    <div className={cn("border-b border-gray-200 dark:border-gray-800", className)}>
      <div className={cn("flex overflow-x-auto", listClassName)}>
        {tabs.map((tab) => {
          const isActive = value === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "whitespace-nowrap border-b-2 px-6 py-4 text-sm font-medium transition-colors",
                isActive
                  ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                  : "border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
