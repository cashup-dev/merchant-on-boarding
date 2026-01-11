import GridShape from "@/components/common/GridShape";
import PartnerMarquee from "@/components/common/PartnerMarquee";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row-reverse w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full bg-zinc-50 dark:bg-white/5 lg:flex items-center hidden">
            <div className="relative flex h-full w-full items-center justify-center">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
              {/* <GridShape /> */}
              <BackgroundRippleEffect />
              <div className="relative z-10 w-full items-center">
                <div className="px-10">
                  <Link href="/" className="mb-5 flex  items-center gap-5">
                    <Image
                      width={200} 
                      height={100}
                      src="/images/logo/cashup-logo.svg"
                      alt="Logo"
                    />
                  </Link>
                <div className="mb-10 bg-gradient-to-r from-zinc-600 via-[#1f9136]  to-[#1f9136] bg-clip-text text-xl text-transparent">
                  Mitra utama anda dalam solusi pembayaran
                </div>
                </div>
                <PartnerMarquee />
              </div>
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
