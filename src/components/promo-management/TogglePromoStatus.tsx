"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";

interface TogglePromoStatusProps {
  promoId: string;
  isActive: boolean;
  onSuccess?: (newStatus: boolean) => void;
}

export default function TogglePromoStatus({ promoId, isActive, onSuccess }: TogglePromoStatusProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(isActive);

  const handleToggle = async () => {
    setLoading(true);
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    try {
      const res = await fetch(`/api/promo/activate/${promoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ is_active: !status }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to toggle status");

      setStatus(!status);
      onSuccess?.(!status);
    } catch (err: any) {
      alert(`Gagal update status: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleToggle} disabled={loading} variant={status ? "destructive" : "success"}>
      {loading ? "Loading..." : status ? "Deactivate" : "Activate"}
    </Button>
  );
}
