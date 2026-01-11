"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export default function SignInForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast.message("Template mode", {
      description: "Sign-in belum dihubungkan ke backend.",
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masuk dengan akun yang sudah terdaftar untuk melanjutkan proses.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="space-y-5">
              <div>
                <Label htmlFor="signin-email">
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="signin-email"
                  name="email"
                  placeholder="nama@bisnis.com"
                />
              </div>
              <div>
                <Label htmlFor="signin-password">
                  Password<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="password"
                  id="signin-password"
                  name="password"
                  placeholder="********"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="signin-remember"
                    checked={isChecked}
                    onCheckedChange={(value) => setIsChecked(Boolean(value))}
                  />
                  <span className="block font-normal text-muted-foreground text-theme-sm dark:text-gray-400">
                    Keep me logged in
                  </span>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Forgot password?
                </Link>
              </div>
              <div>
                <Button className="w-full" size="sm" type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Belum punya akun?
              <Link
                href="/signup"
                className="ml-1 text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
