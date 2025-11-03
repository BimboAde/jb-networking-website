import type { ReactNode } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
  level: HeadingLevel;
  children: ReactNode;
  className?: string;
  highlight?: string;
  highlightClassName?: string;
};

export const Heading = ({
  level,
  children,
  className = '',
  highlight,
  highlightClassName = 'text-brand-gold',
}: HeadingProps) => {
  const baseClasses = 'font-bold font-poppins';
  const sizeClasses: Record<HeadingLevel, string> = {
    1: 'text-5xl lg:text-6xl',
    2: 'text-4xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[level]} ${className}`;

  const content = highlight ? (
    <>
      {children} <span className={highlightClassName}>{highlight}</span>
    </>
  ) : (
    children
  );

  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  switch (level) {
    case 1:
      return <h1 className={combinedClasses}>{content}</h1>;
    case 2:
      return <h2 className={combinedClasses}>{content}</h2>;
    case 3:
      return <h3 className={combinedClasses}>{content}</h3>;
    case 4:
      return <h4 className={combinedClasses}>{content}</h4>;
    case 5:
      return <h5 className={combinedClasses}>{content}</h5>;
    case 6:
      return <h6 className={combinedClasses}>{content}</h6>;
  }
};

