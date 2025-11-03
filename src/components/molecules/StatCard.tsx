type StatCardProps = {
  value: string;
  label: string;
  className?: string;
};

export const StatCard = ({ value, label, className = '' }: StatCardProps) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-3xl font-bold text-brand-gold">{value}</div>
      <div className="text-sm text-green-100">{label}</div>
    </div>
  );
};

