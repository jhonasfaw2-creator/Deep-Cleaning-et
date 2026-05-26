// components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-black text-white hover:bg-gray-800 focus:ring-black/50 shadow-md hover:shadow-lg active:transform active:scale-[0.98]",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400/50 shadow-sm hover:shadow-md active:transform active:scale-[0.98]",
      outline:
        "bg-transparent text-gray-900 border-2 border-gray-300 hover:border-black hover:text-black focus:ring-black/50 active:transform active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-2",
      md: "px-6 py-3 text-base gap-2.5",
      lg: "px-8 py-4 text-lg gap-3",
    };

    const widthStyles = fullWidth ? "w-full" : "";
    const hoverScale = !disabled ? "hover:scale-[1.02]" : "";

    const buttonClasses = `
      ${baseStyles}
      ${variants[variant]}
      ${sizes[size]}
      ${widthStyles}
      ${hoverScale}
      ${className}
    `.trim();

    return (
      <button ref={ref} className={buttonClasses} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;