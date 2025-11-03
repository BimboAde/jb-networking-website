import { getT, type Dict } from '@/lib/i18n-server';
import Link from 'next/link';
import { Logo } from '../atoms/Logo';
import { Button } from '../atoms/Button';
import { NavigationDropdown } from '../molecules/NavigationDropdown';
import { LanguageSwitcher } from '../molecules/LanguageSwitcher';
import { images } from '@/data/images';
import { HeaderMobileMenu } from './HeaderMobileMenu';

export const Header = ({ dict, lang }: { dict: Dict; lang: string }) => {
  const t = getT(dict, 'header');
  const tCommon = getT(dict, 'common');

  const withLang = (path: string) => {
    const cleaned = path.startsWith('/') ? path : `/${path}`;
    return `/${lang}${cleaned}`.replace(/\/+$/, '/');
  };

  const individualServices = [
    { label: t('individualServices.personalTaxAccounting'), href: withLang('/solutions/individuals/tax-accounting') },
    { label: t('individualServices.financialInvestmentPlanning'), href: withLang('/solutions/individuals/financial-planning') },
    { label: t('individualServices.creditDebtResolution'), href: withLang('/solutions/individuals/credit-debt-resolution') },
    { label: t('individualServices.personalRealEstateInsurance'), href: withLang('/solutions/individuals/real-estate-insurance') },
  ];

  const businessServices = [
    { label: t('businessServices.businessTaxAccounting'), href: withLang('/solutions/businesses/business-tax') },
    { label: t('businessServices.businessCreditBuilding'), href: withLang('/solutions/businesses/credit-building') },
    { label: t('businessServices.corporateServices'), href: withLang('/solutions/businesses/corporate-services') },
    { label: t('businessServices.franchiseOpportunities'), href: withLang('/solutions/businesses/franchise-opportunities') },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo companyName={t('companyName')} tagline={t('companyTagline')} src={images.logo.src} alt={images.logo.alt} />

          <nav className="hidden lg:flex items-center space-x-8">
            <NavigationDropdown
              label={t('solutionsForIndividuals')}
              items={individualServices}
            />
            <NavigationDropdown
              label={t('solutionsForBusinesses')}
              items={businessServices}
            />
            <Link
              href={withLang('/about')}
              className="text-gray-700 hover:text-brand-green px-3 py-2 text-sm font-medium"
            >
              {t('aboutUs')}
            </Link>
            <Link
              href={withLang('/locations')}
              className="text-gray-700 hover:text-brand-green px-3 py-2 text-sm font-medium"
            >
              {t('locations')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            <Button variant="primary" href={withLang('/consultation')} className="hidden lg:inline-flex">{tCommon('bookConsultation')}</Button>
            <HeaderMobileMenu
              companyName={t('companyName')}
              tagline={t('companyTagline')}
              about={{ label: t('aboutUs'), href: withLang('/about') }}
              locations={{ label: t('locations'), href: withLang('/locations') }}
              consultation={{ label: tCommon('bookConsultation'), href: withLang('/consultation') }}
              individualServices={individualServices}
              businessServices={businessServices}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

