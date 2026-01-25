"use client";

import React from "react";
import { Info } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type InfoPopoverProps = {
  label: string;
  children: React.ReactNode;
};

export function InfoPopover({ label, children }: InfoPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center text-gray-400 transition hover:text-gray-600"
          aria-label={label}
        >
          <Info className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="text-xs text-gray-600">{children}</PopoverContent>
    </Popover>
  );
}
