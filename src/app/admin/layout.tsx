import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Back-office", template: "%s | Back-office FICA" },
  robots: { index: false, follow: false },
};

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-gris-clair">{children}</div>;
}
