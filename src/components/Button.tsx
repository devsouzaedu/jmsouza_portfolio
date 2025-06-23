// src/components/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  className = "", 
  variant = "default", 
  size = "default", 
  asChild = false, 
  children, 
  ...props 
}) => {
  // Classes base
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";
  
  // Classes de variante
  const variantClasses = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 text-black hover:bg-gray-100",
  };
  
  // Classes de tamanho
  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-8 px-3",
    lg: "h-12 px-6",
  };
  
  const finalClassName = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(" ");
  
  // Se asChild for true e children for um elemento válido, renderiza o children com as props
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: finalClassName,
      ...props,
    });
  }
  
  // Caso contrário, renderiza um button normal
  return (
    <button
      className={finalClassName}
      {...props}
    >
      {children}
    </button>
  );
};
