// components/ui/Card.tsx
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hover = true,
  onClick,
}: CardProps) {
  return (
    <div
      className={`
        bg-white border border-gray-100 rounded-2xl p-6 md:p-8
        transition-all duration-300
        ${hover ? "hover:shadow-lg hover:border-gray-200 hover:translate-y-2px" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
