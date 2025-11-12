import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: ReactNode;
  target?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand-green text-white hover:bg-brand-light-green',
  secondary: 'bg-white text-brand-green hover:bg-gray-50',
  outline: 'border-2 border-white text-white hover:bg-white hover:text-brand-green',
};

export const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  className = '',
  icon,
  target = '_blank',
}: ButtonProps) => {
  const baseClasses =
    'px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center';
  const variantClass = variantStyles[variant];
  const combinedClasses = `${baseClasses} ${variantClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} target={target}>
        {icon && <span className="mr-3">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </button>
  );
};

