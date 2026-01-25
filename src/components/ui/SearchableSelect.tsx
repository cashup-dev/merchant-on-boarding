"use client";

import React, { useDeferredValue, useMemo, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type SelectOption = {
  value: string;
  label: string;
};

type SearchableSelectProps = {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  disabled?: boolean;
};

export function SearchableSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder,
  disabled = false,
}: SearchableSelectProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const filteredOptions = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return options;
    }
    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
  }, [deferredQuery, options]);

  return (
    <Select
      value={value}
      onValueChange={(nextValue) => {
        onValueChange(nextValue);
        setQuery("");
      }}
      disabled={disabled}
    >
      <SelectTrigger id={id} className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="px-3 py-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari..."
            className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm outline-none focus:border-gray-400"
          />
        </div>
        {filteredOptions.length === 0 ? (
          <div className="px-4 py-2 text-sm text-gray-400">Tidak ada hasil</div>
        ) : (
          filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
