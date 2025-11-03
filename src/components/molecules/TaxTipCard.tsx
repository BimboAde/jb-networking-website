import Link from "next/link";

type TaxTipCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  readMoreLabel: string;
};

export const TaxTipCard = ({ icon, title, description, readMoreLabel }: TaxTipCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-brand-green mb-3 font-poppins">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <Link href="/en/consultation" className="text-brand-green font-semibold text-sm hover:text-brand-light-green">{readMoreLabel} →</Link>
    </div>
  );
};


