// components/Typography.tsx
import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4;
}

export function Heading({ children, className = "", level = 2 }: HeadingProps) {
  const styles = {
    1: "text-4xl md:text-5xl font-bold tracking-tight text-gray-900",
    2: "text-3xl md:text-4xl font-semibold tracking-tight text-gray-900",
    3: "text-2xl md:text-3xl font-semibold tracking-tight text-gray-900",
    4: "text-xl md:text-2xl font-semibold text-gray-900",
  };

  const Component = `h${level}` as const;
  
  return (
    <>{(() => {
      const El = Component as any;
      return <El className={`${styles[level]} ${className}`}>{children}</El>;
    })()}</>
  );
}

interface ParagraphProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "base" | "lg";
}

export function Paragraph({ children, className = "", size = "base" }: ParagraphProps) {
  const sizes = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };

  return (
    <p className={`${sizes[size]} text-gray-600 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}