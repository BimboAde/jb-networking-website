import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { InvestmentServiceCard } from '../molecules/InvestmentServiceCard';
import { PiggyBank, PieChart as PieIcon, GraduationCap, Shield } from 'lucide-react';

export const InvestmentServicesGrid = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_financial.services');
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <InvestmentServiceCard dict={dict} Icon={PiggyBank} titleKey={'solutions_financial.services.retirement.title'} descriptionKey={'solutions_financial.services.retirement.description'} valueKey={'solutions_financial.services.retirement.value'} valueLabelKey={'solutions_financial.services.retirement.valueLabel'} />
          <InvestmentServiceCard dict={dict} Icon={PieIcon} titleKey={'solutions_financial.services.portfolio.title'} descriptionKey={'solutions_financial.services.portfolio.description'} valueKey={'solutions_financial.services.portfolio.value'} valueLabelKey={'solutions_financial.services.portfolio.valueLabel'} />
          <InvestmentServiceCard dict={dict} Icon={GraduationCap} titleKey={'solutions_financial.services.education.title'} descriptionKey={'solutions_financial.services.education.description'} valueKey={'solutions_financial.services.education.value'} valueLabelKey={'solutions_financial.services.education.valueLabel'} />
          <InvestmentServiceCard dict={dict} Icon={Shield} titleKey={'solutions_financial.services.risk.title'} descriptionKey={'solutions_financial.services.risk.description'} valueKey={'solutions_financial.services.risk.value'} valueLabelKey={'solutions_financial.services.risk.valueLabel'} />
        </div>
      </div>
    </section>
  );
};


