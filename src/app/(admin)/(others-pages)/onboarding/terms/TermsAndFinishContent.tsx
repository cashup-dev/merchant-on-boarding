"use client";

import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Clause = {
  title: string;
  points: string[];
};

const clauses: Clause[] = [
  {
    title: "Pasal 1 - Ketentuan Umum",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    ],
  },
  {
    title: "Pasal 2 - Ruang Lingkup Layanan",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    ],
  },
  {
    title: "Pasal 3 - Kewajiban Pengguna",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
    ],
  },
  {
    title: "Pasal 4 - Hak dan Tanggung Jawab",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit.",
    ],
  },
  {
    title: "Pasal 5 - Data dan Privasi",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "At vero eos et accusamus et iusto odio dignissimos ducimus.",
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque.",
    ],
  },
  {
    title: "Pasal 6 - Pembayaran dan Biaya",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    ],
  },
  {
    title: "Pasal 7 - Pembatasan Layanan",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    ],
  },
  {
    title: "Pasal 8 - Pengakhiran",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
    ],
  },
  {
    title: "Pasal 9 - Penyelesaian Sengketa",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit.",
    ],
  },
  {
    title: "Pasal 10 - Ketentuan Penutup",
    points: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "At vero eos et accusamus et iusto odio dignissimos ducimus.",
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque.",
    ],
  },
];

export default function TermsAndFinishContent() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleScroll = () => {
    const target = scrollRef.current;
    if (!target) return;
    const atBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 4;
    if (atBottom) {
      setHasScrolledToEnd(true);
    }
  };

  const instructionText = useMemo(() => {
    return hasScrolledToEnd
      ? "Anda sudah membaca sampai akhir."
      : "Scroll sampai bawah untuk mengaktifkan persetujuan.";
  }, [hasScrolledToEnd]);

  return (
    <div className="space-y-6">
      <div className="max-w-2xl space-y-3">
        <h1 className="text-2xl font-semibold text-gray-900">Terms</h1>
        <p className="text-sm text-gray-500">
          Tinjau syarat, konfirmasi data, lalu kirim permohonan.
        </p>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="max-h-[420px] space-y-6 overflow-y-auto"
      >
        {clauses.map((clause) => (
          <div key={clause.title} className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-900">{clause.title}</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
              {clause.points.map((point, index) => (
                <li key={`${clause.title}-${index}`}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-400">{instructionText}</p>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            disabled={!hasScrolledToEnd}
            className="h-4 w-4 rounded border-gray-300 text-gray-900"
          />
          Saya menyetujui semua persyaratan
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!accepted}
          className={`rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition ${
            accepted ? "bg-teal-500 hover:bg-teal-600" : "cursor-not-allowed bg-gray-200 text-gray-400"
          }`}
          onClick={() => {
            if (accepted) {
              router.push("/onboarding/in-review");
            }
          }}
        >
          Kirim
        </button>
      </div>
    </div>
  );
}



