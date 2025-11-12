import { getT, type Dict } from '@/lib/i18n-server';
import Link from 'next/link';
import { Logo } from '../atoms/Logo';
import { Button } from '../atoms/Button';
import { NavigationDropdown } from '../molecules/NavigationDropdown';
import { LanguageSwitcher } from '../molecules/LanguageSwitcher';
import { HeaderMobileMenu } from './HeaderMobileMenu';
import { getImageByLabel } from '@/lib/media';

export const Header = async ({ dict, lang }: { dict: Dict; lang: string }) => {
  const t = getT(dict, 'header');
  const tCommon = getT(dict, 'common');
  const logo = await getImageByLabel('logo');

  const withLang = (path: string) => {
    const cleaned = path.startsWith('/') ? path : `/${path}`;
    return `/${lang}${cleaned}`.replace(/\/+$/, '/');
  };

  const individualServices = [
    { label: t('individualServices.personalTaxAccounting'), href: withLang('/solutions/individuals/tax-client-intake') },
    { label: t('individualServices.financialInvestmentPlanning'), href: withLang('/solutions/individuals/financial-insurance-planning') },
    { label: t('individualServices.creditDebtResolution'), href: withLang('/solutions/individuals/credit-debt-resolution') },
    { label: t('individualServices.personalRealEstateInsurance'), href: withLang('/solutions/individuals/real-estate-mortgage') },
  ];

  const businessServices = [
    { label: t('businessServices.businessTaxAccounting'), href: withLang('/solutions/businesses/business-accountant-services') },
    // { label: t('businessServices.businessCreditBuilding'), href: withLang('/solutions/businesses/business-credit-building') },
    { label: t('businessServices.corporateServices'), href: withLang('/solutions/businesses/corporate-services') },
    { label: t('businessServices.executiveServices'), href: withLang('/solutions/businesses/executive-services') },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo companyName={t('companyName')} tagline={t('companyTagline')} src={logo?.src || '/jblogo.png'} alt={logo?.alt || 'JB Networking Systems Logo'} />

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

