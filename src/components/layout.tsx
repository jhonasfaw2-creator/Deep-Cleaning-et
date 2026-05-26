// components/Layout.tsx
"use client";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <div className="container-premium">
        {children}
      </div>
    </div>
  );
}

// Section Component
interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "white" | "gray" | "gradient";
}

export function Section({ children, className = "", background = "white" }: SectionProps) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    gradient: "bg-gradient-to-br from-gray-50 to-gray-100",
  };

  return (
    <section className={`${backgrounds[background]} py-16 md:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}