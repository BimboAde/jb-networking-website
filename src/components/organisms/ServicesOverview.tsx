import { getT, type Dict } from '@/lib/i18n-server';
import { MotionDiv } from '../atoms/Motion';
import { Calculator, ShieldCheck, CreditCard, Building2, Home, Briefcase } from 'lucide-react';
import { Heading } from '../atoms/Heading';
import { ServiceCard } from '../molecules/ServiceCard';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { getT as _getT } from '@/lib/i18n-server';

export const ServicesOverview = ({ dict, lang }: { dict: Dict; lang: string }) => {
  const t = getT(dict, 'services');
  const withLang = (path: string) => `/${lang}${path.startsWith('/') ? path : '/' + path}`.replace(/\/+$/, '/');

  const services = [
    {
      icon: Calculator,
      titleKey: 'services.taxIntake.title',
      descriptionKey: 'services.taxIntake.description',
      featuresKey: [
        'services.taxIntake.features.0',
        'services.taxIntake.features.1',
        'services.taxIntake.features.2',
        'services.taxIntake.features.3',
      ],
      href: withLang('/solutions/individuals/tax-client-intake'),
    },
    {
      icon: ShieldCheck,
      titleKey: 'services.financialInsurance.title',
      descriptionKey: 'services.financialInsurance.description',
      featuresKey: [
        'services.financialInsurance.features.0',
        'services.financialInsurance.features.1',
        'services.financialInsurance.features.2',
        'services.financialInsurance.features.3',
      ],
      href: withLang('/solutions/individuals/financial-insurance-planning'),
    },
    {
      icon: CreditCard,
      titleKey: 'services.creditDebt.title',
      descriptionKey: 'services.creditDebt.description',
      featuresKey: [
        'services.creditDebt.features.0',
        'services.creditDebt.features.1',
        'services.creditDebt.features.2',
        'services.creditDebt.features.3',
      ],
      hasBadge: true,
      badgeTextKey: 'services.moneyBackGuaranteeBadge',
      href: withLang('/solutions/individuals/credit-debt-resolutions'),
    },
    {
      icon: Building2,
      titleKey: 'services.businessAccountant.title',
      descriptionKey: 'services.businessAccountant.description',
      featuresKey: [
        'services.businessAccountant.features.0',
        'services.businessAccountant.features.1',
        'services.businessAccountant.features.2',
        'services.businessAccountant.features.3',
      ],
      href: withLang('/solutions/businesses/business-accountant-services'),
    },
    {
      icon: Home,
      titleKey: 'services.realEstateMortgage.title',
      descriptionKey: 'services.realEstateMortgage.description',
      featuresKey: [
        'services.realEstateMortgage.features.0',
        'services.realEstateMortgage.features.1',
        'services.realEstateMortgage.features.2',
        'services.realEstateMortgage.features.3',
      ],
      href: withLang('/solutions/individuals/real-estate-mortgage'),
    },
    {
      icon: Briefcase,
      titleKey: 'services.executive.title',
      descriptionKey: 'services.executive.description',
      featuresKey: [
        'services.executive.features.0',
        'services.executive.features.1',
        'services.executive.features.2',
        'services.executive.features.3',
      ],
      href: withLang('/solutions/businesses/executive-services'),
    },
  ];

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <Heading level={2} className="mb-4 text-brand-green">
            {t('title')}
          </Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </MotionDiv>

        <MotionDiv
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard
              dict={dict}
              key={index}
              icon={service.icon}
              titleKey={service.titleKey}
              descriptionKey={service.descriptionKey}
              featuresKey={service.featuresKey}
              hasBadge={service.hasBadge}
              badgeTextKey={service.badgeTextKey}
              href={service.href}
            />
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};

