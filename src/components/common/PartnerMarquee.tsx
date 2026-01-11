"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

const logos = [
  {
    src: "/images/logo/partner-1/1199px-Bank_Central_Asia.svg.png",
    alt: "BCA",
  },
  {
    src: "/images/logo/partner-1/1200px-CIMB_Niaga_logo.svg.png",
    alt: "CIMB Niaga",
  },
  {
    src: "/images/logo/partner-1/2560px-UOB_Logo.svg.png",
    alt: "UOB",
  },
  {
    src: "/images/logo/partner-1/Bank_Mega_2013.svg.png",
    alt: "Bank Mega",
  },
  {
    src: "/images/logo/partner-1/Bank_of_China.svg.png",
    alt: "Bank of China",
  },
  {
    src: "/images/logo/partner-1/BTN_2024.svg.png",
    alt: "BTN",
  },
  {
    src: "/images/logo/partner-1/Logo-Bank-BRI.png",
    alt: "BRI",
  },
  {
    src: "/images/logo/partner-1/Logo-BNI-Bank-Negara-Indonesia-46-Vector-.png",
    alt: "BNI",
  },
  {
    src: "/images/logo/partner-1/HSBC_logo_(2018).svg.png",
    alt: "HSBC",
  },
  {
    src: "/images/logo/partner-1/Mandiri_logo.png",
    alt: "Bank Mandiri",
  },
];

const logosSecondary = [
  {
    src: "/images/logo/partner-2/data digi.png",
    alt: "Data Digi",
  },
  {
    src: "/images/logo/partner-2/dc megawatt.png",
    alt: "DC Megawatt",
  },
  {
    src: "/images/logo/partner-2/digi.png",
    alt: "Digi",
  },
  {
    src: "/images/logo/partner-2/eyeseller.png",
    alt: "Eyeseller",
  },
  {
    src: "/images/logo/partner-2/gopay-logo-new.png",
    alt: "GoPay",
  },
  {
    src: "/images/logo/partner-2/gopay.png",
    alt: "GoPay",
  },
  {
    src: "/images/logo/partner-2/gpa.png",
    alt: "GPA",
  },
  {
    src: "/images/logo/partner-2/LinkAja.png",
    alt: "LinkAja",
  },
  {
    src: "/images/logo/partner-2/logo beetPOS new.png",
    alt: "BeetPOS",
  },
  {
    src: "/images/logo/partner-2/logo ovo baru.png",
    alt: "OVO",
  },
  {
    src: "/images/logo/partner-2/LOGO-FASPAY-2024-LANDSCAPE.png",
    alt: "Faspay",
  },
  {
    src: "/images/logo/partner-2/NB10-DOKU.png",
    alt: "DOKU",
  },
  {
    src: "/images/logo/partner-2/nicepay.jpg",
    alt: "Nicepay",
  },
  {
    src: "/images/logo/partner-2/nine fox lab.png",
    alt: "Nine Fox Lab",
  },
  {
    src: "/images/logo/partner-2/olsera.png",
    alt: "Olsera",
  },
  {
    src: "/images/logo/partner-2/ovo-logo-png-6.png",
    alt: "OVO",
  },
  {
    src: "/images/logo/partner-2/OY! logo.png",
    alt: "OY!",
  },
  {
    src: "/images/logo/partner-2/paper.png",
    alt: "Paper",
  },
  {
    src: "/images/logo/partner-2/PingPong_Logo_[Blue].png",
    alt: "PingPong",
  },
  {
    src: "/images/logo/partner-2/PrismaLink-Logo-1.png",
    alt: "PrismaLink",
  },
  {
    src: "/images/logo/partner-2/shopeepay.png",
    alt: "ShopeePay",
  },
  {
    src: "/images/logo/partner-2/wolu.png",
    alt: "Wolu",
  },
];

export default function PartnerMarquee() {
  return (
    <div className="w-full">
      <p className="mb-3 text-center text-sm font-semibold text-gray-700 dark:text-white/80">
        Partner kami
      </p>
      <div className="relative overflow-hidden bg-transparent px-3 py-2 dark:bg-gray-900/85">
        <Marquee pauseOnHover className="[--duration:28s]">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex h-12 w-36 items-center justify-center px-3 py-2 dark:bg-gray-900/60"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={48}
                className="h-8 w-auto object-contain opacity-90 grayscale-100 hover:grayscale-0"
              />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#fafafa]  to-transparent dark:from-gray-900"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#f5f5f5] to-transparent dark:from-gray-900"></div>
      </div>
      <div className="relative mt-4 overflow-hidden bg-transparent px-3 py-2 dark:bg-gray-900/85">
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {logosSecondary.map((logo) => (
            <div
              key={`${logo.alt}-${logo.src}`}
              className="flex h-12 w-36 items-center justify-center rounded-lg px-3 py-2 dark:bg-gray-900/60"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={48}
                className="h-8 w-auto object-contain opacity-90 grayscale-100 hover:grayscale-0"
              />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#fafafa]  to-transparent dark:from-gray-900"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#fafafa]  to-transparent dark:from-gray-900"></div>
      </div>
    </div>
  );
}
