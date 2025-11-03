import Link from 'next/link';

type Crumb = { label: string; href?: string };

export const Breadcrumb = ({ items }: { items: Crumb[] }) => {
  return (
    <nav aria-label="Breadcrumb" className="bg-brand-gray py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center">
              {item.href ? (
                <Link href={item.href} className="text-brand-green hover:text-brand-light-green">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-600 font-medium">{item.label}</span>
              )}
              {idx < items.length - 1 && <span className="text-gray-400 mx-2">/</span>}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};


