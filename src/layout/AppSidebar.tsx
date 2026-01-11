"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { HorizontaLDots } from "../icons/index";
import { Store, Users, Calendar, FileText, CreditCard } from "lucide-react";

type TimelineStep = {
  title: string;
  description: string;
  href: string;
};

const onboardingSteps: TimelineStep[] = [
  {
    title: "Pemilik/Perwakilan Bisnis",
    description: "Data pemilik & perwakilan",
    href: "/business-representative-information",
  },
  {
    title: "Informasi Merchant/Badan Usaha",
    description: "Profil usaha & dokumen",
    href: "/business-entity",
  },
  {
    title: "Terms & Finish",
    description: "Syarat & submit",
    href: "/terms-and-finish",
  },
];

const gradientStyle = {
  background: "linear-gradient(135deg, #186229 0%, #212c63 100%)",
};

// Komponen Sidebar Utama
const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const isOnboardingRoute = [
    "/business-representative-information",
    "/business-entity",
    "/terms-and-finish",
  ].some((path) => pathname.startsWith(path));
  const showSidebarContent = isExpanded || isHovered || isMobileOpen;
  const activeOnboardingIndex = Math.max(
    0,
    onboardingSteps.findIndex((step) => pathname.startsWith(step.href)),
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 mx-auto flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="">
              <Image
                className="sm:hidden"
                src="/images/logo/cashup-logo.svg" // Pastikan path logo benar
                alt="Logo"
                width={150}
                height={50}
              />
              <Image
                className="m-auto hidden sm:inline-flex"
                src="/images/logo/cashup-logo.svg" // Pastikan path logo benar
                alt="Logo"
                width={220}
                height={50}
              />
              {/* <span className="text-blue-400 text-2xl font-semibold">cashUP <span className="text-zinc-400">Backoffice</span></span> */}
            </div>
          ) : (
            <Image
              src="/images/logo/cashup-logo.svg" // Pastikan path logo benar
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                }`}
              >
                {showSidebarContent ? (isOnboardingRoute ? "Onboarding" : "Menu") : <HorizontaLDots />}
              </h2>
              {isOnboardingRoute ? (
                <div>
                  {showSidebarContent && (
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                      Progress
                    </p>
                  )}
                  <div className={showSidebarContent ? "mt-4" : ""}>
                    <div className="relative">
                      {showSidebarContent && (
                        <div className="pointer-events-none absolute left-[11px] top-1 h-[calc(100%-8px)] w-[2px] rounded-full bg-gradient-to-b from-[#186229] via-[#1b4f4a] to-[#212c63] opacity-35" />
                      )}
                      <ul className="space-y-7">
                        {onboardingSteps.map((step, index) => {
                          const isComplete = index < activeOnboardingIndex;
                          const isCurrent = index === activeOnboardingIndex;
                          const labelColor = isCurrent
                            ? "text-gray-900"
                            : isComplete
                            ? "text-gray-700"
                            : "text-gray-400";

                          return (
                            <li key={step.href} className="relative">
                              <Link
                                href={step.href}
                                aria-current={isCurrent ? "step" : undefined}
                                className={`group flex items-start ${showSidebarContent ? "gap-4" : "justify-center"}`}
                              >
                                <div className="mt-0.5 flex h-6 w-6 items-center justify-center">
                                  {isComplete ? (
                                    <span
                                      className="flex h-full w-full items-center justify-center rounded-full text-white shadow-sm"
                                      style={gradientStyle}
                                    >
                                      <svg
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3.5 w-3.5"
                                      >
                                        <path
                                          d="M13.2 4.4L6.6 11l-3.8-3.8"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </span>
                                  ) : isCurrent ? (
                                    <span
                                      className="flex h-full w-full items-center justify-center rounded-full p-[2px] shadow-sm"
                                      style={gradientStyle}
                                    >
                                      <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
                                        <span
                                          className="h-2.5 w-2.5 rounded-full"
                                          style={gradientStyle}
                                        />
                                      </span>
                                    </span>
                                  ) : (
                                    <span className="h-full w-full rounded-full border border-gray-200 bg-white shadow-xs" />
                                  )}
                                </div>
                                {showSidebarContent && (
                                  <div className="space-y-1">
                                    <p
                                      className={`text-sm font-semibold transition-colors ${labelColor} group-hover:text-gray-900`}
                                    >
                                      {step.title}
                                    </p>
                                    <p className="text-xs text-gray-400 group-hover:text-gray-500">
                                      {step.description}
                                    </p>
                                  </div>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                  ""
              )}
            </div>
            
            {/* DIV UNTUK "OTHERS" TELAH DIHAPUS DARI SINI */}

          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
