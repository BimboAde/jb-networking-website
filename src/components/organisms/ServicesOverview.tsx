import { getT, type Dict } from '@/lib/i18n-server';
import { MotionDiv } from '../atoms/Motion';
import {
  Calculator,
  TrendingUp,
  CreditCard,
  Building2,
  Home,
} from 'lucide-react';
import { Heading } from '../atoms/Heading';
import { ServiceCard } from '../molecules/ServiceCard';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export const ServicesOverview = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'services');

  const services = [
    {
      icon: Calculator,
      titleKey: 'services.taxAccounting.title',
      descriptionKey: 'services.taxAccounting.description',
      featuresKey: [
        'services.taxAccounting.features.personalTaxReturns',
        'services.taxAccounting.features.businessTaxPreparation',
        'services.taxAccounting.features.payrollServices',
        'services.taxAccounting.features.bookkeeping',
      ],
    },
    {
      icon: TrendingUp,
      titleKey: 'services.financialPlanning.title',
      descriptionKey: 'services.financialPlanning.description',
      featuresKey: [
        'services.financialPlanning.features.investmentStrategy',
        'services.financialPlanning.features.retirementPlanning',
        'services.financialPlanning.features.portfolioManagement',
        'services.financialPlanning.features.riskAssessment',
      ],
    },
    {
      icon: CreditCard,
      titleKey: 'services.creditDebtResolution.title',
      descriptionKey: 'services.creditDebtResolution.description',
      featuresKey: [
        'services.creditDebtResolution.features.creditRepair',
        'services.creditDebtResolution.features.debtConsolidation',
        'services.creditDebtResolution.features.creditMonitoring',
        'services.creditDebtResolution.features.financialCounseling',
      ],
      hasBadge: true,
      badgeTextKey: 'services.moneyBackGuaranteeBadge',
    },
    {
      icon: Building2,
      titleKey: 'services.businessServices.title',
      descriptionKey: 'services.businessServices.description',
      featuresKey: [
        'services.businessServices.features.businessFormation',
        'services.businessServices.features.corporateFiling',
        'services.businessServices.features.businessCreditBuilding',
        'services.businessServices.features.franchiseSupport',
      ],
    },
    {
      icon: Home,
      titleKey: 'services.realEstateInsurance.title',
      descriptionKey: 'services.realEstateInsurance.description',
      featuresKey: [
        'services.realEstateInsurance.features.realEstateConsulting',
        'services.realEstateInsurance.features.propertyInvestment',
        'services.realEstateInsurance.features.insurancePlanning',
        'services.realEstateInsurance.features.riskManagement',
      ],
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
            />
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};

