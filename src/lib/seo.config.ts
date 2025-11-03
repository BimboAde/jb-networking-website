import { Metadata } from 'next';

const siteName = 'JB Networking Systems';
const siteUrl = 'https://jbnetworkingsystems.com';

type PageSEO = {
  metadata: Metadata;
  jsonLd: string;
};

// Helper to generate JSON-LD script
const generateJsonLd = (data: object): string => {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
};

export const getPageSEO = (pageKey: 'home' | 'about' | 'services' | 'solutions-individual' | 'solutions-tax-accounting' | 'solutions-credit-debt' | 'solutions-real-estate' | 'solutions-business' | 'solutions-financial' | 'solutions-business-credit' | 'solutions-corporate' | 'solutions-franchise' | 'solutions-business-tax' | 'locations' | 'consultation' | 'terms' | 'cookies', locale: string = 'en'): PageSEO => {
  const isSpanish = locale === 'es';
  
  switch (pageKey) {
    case 'home':
      const homeJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: siteName,
        url: siteUrl,
        description: isSpanish
          ? 'Servicios Financieros y Fiscales Profesionales, ¡Con un Toque Personal!'
          : 'Professional Financial & Tax Services, With a Personal Touch!',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
          addressRegion: ['GA', 'AL', 'TX'],
        },
        areaServed: {
          '@type': 'State',
          name: ['Georgia', 'Alabama', 'Texas'],
        },
        serviceType: [
          'Tax Preparation',
          'Accounting Services',
          'Financial Planning',
          'Credit Repair',
          'Debt Resolution',
          'Business Formation',
        ],
      });

      return {
        metadata: {
          title: isSpanish ? `Inicio | ${siteName}` : `Home | ${siteName}`,
          description: isSpanish
            ? 'Servicios Financieros y Fiscales Profesionales, ¡Con un Toque Personal!'
            : 'Professional Financial & Tax Services, With a Personal Touch!',
          openGraph: {
            title: isSpanish ? `Inicio | ${siteName}` : `Home | ${siteName}`,
            description: isSpanish
              ? 'Servicios Financieros y Fiscales Profesionales, ¡Con un Toque Personal!'
              : 'Professional Financial & Tax Services, With a Personal Touch!',
            url: siteUrl,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title: isSpanish ? `Inicio | ${siteName}` : `Home | ${siteName}`,
            description: isSpanish
              ? 'Servicios Financieros y Fiscales Profesionales, ¡Con un Toque Personal!'
              : 'Professional Financial & Tax Services, With a Personal Touch!',
          },
          alternates: {
            canonical: siteUrl,
            languages: {
              en: `${siteUrl}/en`,
              es: `${siteUrl}/es`,
            },
          },
        },
        jsonLd: homeJsonLd,
      };

    case 'about':
      const aboutJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: `${siteName} - About Us`,
        url: `${siteUrl}/about`,
        description: isSpanish
          ? 'Conozca más sobre JB Networking Systems LLC y nuestra misión de proteger sus activos con un toque personal.'
          : 'Learn more about JB Networking Systems LLC and our mission to safeguard your assets with a personal touch.',
      });

      return {
        metadata: {
          title: isSpanish ? `Acerca de Nosotros | ${siteName}` : `About Us | ${siteName}`,
          description: isSpanish
            ? 'Conozca más sobre JB Networking Systems LLC y nuestra misión de proteger sus activos con un toque personal.'
            : 'Learn more about JB Networking Systems LLC and our mission to safeguard your assets with a personal touch.',
          openGraph: {
            title: isSpanish ? `Acerca de Nosotros | ${siteName}` : `About Us | ${siteName}`,
            description: isSpanish
              ? 'Conozca más sobre JB Networking Systems LLC y nuestra misión de proteger sus activos con un toque personal.'
              : 'Learn more about JB Networking Systems LLC and our mission to safeguard your assets with a personal touch.',
            url: `${siteUrl}/about`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
        },
        jsonLd: aboutJsonLd,
      };

    case 'services':
      const servicesJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Financial Services',
        provider: {
          '@type': 'FinancialService',
          name: siteName,
        },
        areaServed: {
          '@type': 'State',
          name: ['Georgia', 'Alabama', 'Texas'],
        },
        description: isSpanish
          ? 'Soluciones financieras integrales que incluyen impuestos, contabilidad, planificación financiera, reparación de crédito y servicios empresariales.'
          : 'Comprehensive financial solutions including tax preparation, accounting, financial planning, credit repair, and business services.',
      });

      return {
        metadata: {
          title: isSpanish ? `Servicios | ${siteName}` : `Services | ${siteName}`,
          description: isSpanish
            ? 'Soluciones financieras integrales que incluyen impuestos, contabilidad, planificación financiera, reparación de crédito y servicios empresariales.'
            : 'Comprehensive financial solutions including tax preparation, accounting, financial planning, credit repair, and business services.',
          openGraph: {
            title: isSpanish ? `Servicios | ${siteName}` : `Services | ${siteName}`,
            description: isSpanish
              ? 'Soluciones financieras integrales que incluyen impuestos, contabilidad, planificación financiera, reparación de crédito y servicios empresariales.'
              : 'Comprehensive financial solutions including tax preparation, accounting, financial planning, credit repair, and business services.',
            url: `${siteUrl}/services`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
        },
        jsonLd: servicesJsonLd,
      };

    case 'solutions-individual':
      const individualsJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Personal Financial Services',
        provider: {
          '@type': 'FinancialService',
          name: siteName,
        },
        areaServed: {
          '@type': 'State',
          name: ['Georgia', 'Alabama', 'Texas'],
        },
        description: isSpanish
          ? 'Soluciones financieras personales: impuestos, planificación financiera, reparación de crédito y protección de activos.'
          : 'Personal financial solutions: tax, financial planning, credit repair, and asset protection.',
      });

      return {
        metadata: {
          title: isSpanish ? `Soluciones para Individuos | ${siteName}` : `Solutions for Individuals | ${siteName}`,
          description: isSpanish
            ? 'Servicios financieros personales diseñados para proteger y hacer crecer su patrimonio.'
            : 'Personal financial services designed to protect and grow your wealth.',
          openGraph: {
            title: isSpanish ? `Soluciones para Individuos | ${siteName}` : `Solutions for Individuals | ${siteName}`,
            description: isSpanish
              ? 'Servicios financieros personales diseñados para proteger y hacer crecer su patrimonio.'
              : 'Personal financial services designed to protect and grow your wealth.',
            url: `${siteUrl}/solutions/individuals`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
        },
        jsonLd: individualsJsonLd,
      };

    case 'solutions-tax-accounting':
      const taxJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        serviceType: 'Personal Tax & Accounting',
        provider: {
          '@type': 'Organization',
          name: siteName,
        },
        areaServed: {
          '@type': 'State',
          name: ['Georgia', 'Alabama', 'Texas'],
        },
        description: isSpanish
          ? 'Servicios de impuestos y contabilidad personales: maximice ahorros y mantenga registros financieros organizados.'
          : 'Personal tax and accounting services: maximize savings and keep financial records streamlined.',
      });

      return {
        metadata: {
          title: isSpanish ? `Impuestos y Contabilidad Personal | ${siteName}` : `Personal Tax & Accounting | ${siteName}`,
          description: isSpanish
            ? 'Maximice sus ahorros de impuestos y organice sus finanzas con nuestros servicios de impuestos y contabilidad personales.'
            : 'Maximize your tax savings and streamline your finances with our personal tax and accounting services.',
          openGraph: {
            title: isSpanish ? `Impuestos y Contabilidad Personal | ${siteName}` : `Personal Tax & Accounting | ${siteName}`,
            description: isSpanish
              ? 'Maximice sus ahorros de impuestos y organice sus finanzas con nuestros servicios de impuestos y contabilidad personales.'
              : 'Maximize your tax savings and streamline your finances with our personal tax and accounting services.',
            url: `${siteUrl}/solutions/individuals/tax-accounting`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
        },
        jsonLd: taxJsonLd,
      };

    case 'solutions-credit-debt':
      const creditJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        serviceType: 'Credit & Debt Resolution',
        provider: {
          '@type': 'Organization',
          name: siteName,
        },
        areaServed: {
          '@type': 'State',
          name: ['Georgia', 'Alabama', 'Texas'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Money Back Guarantee',
        },
        description: isSpanish
          ? 'Soluciones de crédito y deuda con garantía de devolución de dinero.'
          : 'Credit and debt resolution solutions with a money-back guarantee.',
      });

      return {
        metadata: {
          title: isSpanish ? `Crédito y Resolución de Deuda | ${siteName}` : `Credit & Debt Resolution | ${siteName}`,
          description: isSpanish
            ? 'Mejore su puntaje de crédito y resuelva deudas con garantía.'
            : 'Improve your credit score and resolve debt with a money-back guarantee.',
          openGraph: {
            title: isSpanish ? `Crédito y Resolución de Deuda | ${siteName}` : `Credit & Debt Resolution | ${siteName}`,
            description: isSpanish
              ? 'Mejore su puntaje de crédito y resuelva deudas con garantía.'
              : 'Improve your credit score and resolve debt with a money-back guarantee.',
            url: `${siteUrl}/solutions/individuals/credit-debt-resolution`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
        },
        jsonLd: creditJsonLd,
      };

    case 'solutions-real-estate':
      const realEstateJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${siteName} - ${isSpanish ? 'Bienes Raíces e Seguros Personales' : 'Personal Real Estate & Insurance'}`,
        url: `${siteUrl}/solutions/individuals/real-estate-insurance`,
        description: isSpanish
          ? 'Consultoría inmobiliaria y planificación de seguros para proteger sus activos y su futuro.'
          : 'Real estate consulting and insurance planning to protect your assets and future.',
        mainEntity: [
          {
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            name: siteName,
            areaServed: ['Georgia', 'Alabama', 'Texas'],
            url: siteUrl,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'InsuranceAgency',
            name: siteName,
            areaServed: ['Georgia', 'Alabama', 'Texas'],
            url: siteUrl,
          },
        ],
      });

      return {
        metadata: {
          title: isSpanish ? `Bienes Raíces e Seguros Personales | ${siteName}` : `Personal Real Estate & Insurance | ${siteName}`,
          description: isSpanish
            ? 'Consultoría inmobiliaria personalizada y planificación de seguros para proteger sus bienes más valiosos.'
            : 'Comprehensive real estate consulting and insurance planning to protect your most valuable assets.',
          openGraph: {
            title: isSpanish ? `Bienes Raíces e Seguros Personales | ${siteName}` : `Personal Real Estate & Insurance | ${siteName}`,
            description: isSpanish
              ? 'Consultoría inmobiliaria personalizada y planificación de seguros para proteger sus bienes más valiosos.'
              : 'Comprehensive real estate consulting and insurance planning to protect your most valuable assets.',
            url: `${siteUrl}/solutions/individuals/real-estate-insurance`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
          alternates: {
            canonical: `${siteUrl}/solutions/individuals/real-estate-insurance`,
            languages: {
              en: `${siteUrl}/en/solutions/individuals/real-estate-insurance`,
              es: `${siteUrl}/es/solutions/individuals/real-estate-insurance`,
            },
          },
        },
        jsonLd: realEstateJsonLd,
      };

    case 'solutions-business':
      const businessJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: `${siteName} - ${isSpanish ? 'Soluciones para Negocios' : 'Business Solutions'}`,
        url: `${siteUrl}/solutions/businesses`,
        areaServed: ['Georgia', 'Alabama', 'Texas'],
        serviceType: [
          'Business Tax & Accounting',
          'Business Credit Building',
          'Corporate Services',
          'Franchise Opportunities',
        ],
        description: isSpanish
          ? 'Infraestructura financiera integral para empresas: impuestos, contabilidad, crédito empresarial, servicios corporativos y franquicias.'
          : 'Complete financial infrastructure for businesses: tax & accounting, business credit, corporate services, and franchise support.',
      });

      return {
        metadata: {
          title: isSpanish ? `Soluciones para Negocios | ${siteName}` : `Solutions for Businesses | ${siteName}`,
          description: isSpanish
            ? 'Desde la formación de empresas hasta la expansión de franquicias, brindamos la infraestructura financiera completa para hacer crecer su negocio.'
            : 'From startup formation to franchise expansion, we provide the complete financial infrastructure your business needs to grow.',
          openGraph: {
            title: isSpanish ? `Soluciones para Negocios | ${siteName}` : `Solutions for Businesses | ${siteName}`,
            description: isSpanish
              ? 'Desde la formación de empresas hasta la expansión de franquicias, brindamos la infraestructura financiera completa para hacer crecer su negocio.'
              : 'From startup formation to franchise expansion, we provide the complete financial infrastructure your business needs to grow.',
            url: `${siteUrl}/solutions/businesses`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
          alternates: {
            canonical: `${siteUrl}/solutions/businesses`,
            languages: {
              en: `${siteUrl}/en/solutions/businesses`,
              es: `${siteUrl}/es/solutions/businesses`,
            },
          },
        },
        jsonLd: businessJsonLd,
      };

    case 'solutions-financial':
      const financialJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: `${siteName} - ${locale === 'es' ? 'Planificación Financiera e Inversiones' : 'Financial & Investment Planning'}`,
        url: `${siteUrl}/solutions/individuals/financial-planning`,
        areaServed: ['Georgia', 'Alabama', 'Texas'],
        serviceType: [
          'Retirement Planning',
          'Portfolio Management',
          'Education Funding',
          'Risk Management',
        ],
        description: locale === 'es'
          ? 'Estrategias personalizadas de inversión, planificación de jubilación y gestión patrimonial.'
          : 'Personalized investment strategies, retirement planning, and wealth management solutions.',
      });

      return {
        metadata: {
          title: locale === 'es' ? `Planificación Financiera e Inversiones | ${siteName}` : `Financial & Investment Planning | ${siteName}`,
          description: locale === 'es'
            ? 'Asegure su futuro con estrategias personalizadas de inversión y planificación de jubilación.'
            : 'Secure your future with personalized investment strategies and retirement planning.',
          openGraph: {
            title: locale === 'es' ? `Planificación Financiera e Inversiones | ${siteName}` : `Financial & Investment Planning | ${siteName}`,
            description: locale === 'es'
              ? 'Asegure su futuro con estrategias personalizadas de inversión y planificación de jubilación.'
              : 'Secure your future with personalized investment strategies and retirement planning.',
            url: `${siteUrl}/solutions/individuals/financial-planning`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
          alternates: {
            canonical: `${siteUrl}/solutions/individuals/financial-planning`,
            languages: {
              en: `${siteUrl}/en/solutions/individuals/financial-planning`,
              es: `${siteUrl}/es/solutions/individuals/financial-planning`,
            },
          },
        },
        jsonLd: financialJsonLd,
      };

    case 'solutions-business-credit':
      const businessCreditJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: `${siteName} - ${locale === 'es' ? 'Crédito Comercial' : 'Business Credit Building'}`,
        url: `${siteUrl}/solutions/businesses/credit-building`,
        areaServed: ['Georgia', 'Alabama', 'Texas'],
        serviceType: [
          'Business Credit Building',
          'Vendor Trade Lines',
          'Credit Monitoring',
        ],
        description: locale === 'es'
          ? 'Establezca y fortalezca el crédito comercial para acceder a mejores financiamientos.'
          : 'Establish and strengthen business credit to access better financing.',
      });

      return {
        metadata: {
          title: locale === 'es' ? `Crédito Comercial | ${siteName}` : `Business Credit Building | ${siteName}`,
          description: locale === 'es'
            ? 'Construya un sólido perfil de crédito comercial y desbloquee mejores tasas y oportunidades.'
            : 'Build a strong business credit profile and unlock better rates and opportunities.',
          openGraph: {
            title: locale === 'es' ? `Crédito Comercial | ${siteName}` : `Business Credit Building | ${siteName}`,
            description: locale === 'es'
              ? 'Construya un sólido perfil de crédito comercial y desbloquee mejores tasas y oportunidades.'
              : 'Build a strong business credit profile and unlock better rates and opportunities.',
            url: `${siteUrl}/solutions/businesses/credit-building`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
          alternates: {
            canonical: `${siteUrl}/solutions/businesses/credit-building`,
            languages: {
              en: `${siteUrl}/en/solutions/businesses/credit-building`,
              es: `${siteUrl}/es/solutions/businesses/credit-building`,
            },
          },
        },
        jsonLd: businessCreditJsonLd,
      };

    case 'solutions-corporate':
      const corporateJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: `${siteName} - ${locale === 'es' ? 'Servicios Corporativos' : 'Corporate Services'}`,
        url: `${siteUrl}/solutions/businesses/corporate-services`,
        areaServed: ['Georgia', 'Alabama', 'Texas'],
        department: [
          { '@type': 'Organization', name: 'Business Formation' },
          { '@type': 'Organization', name: 'Compliance & Maintenance' },
        ],
        description: locale === 'es'
          ? 'Formación de empresas y cumplimiento continuo con protección legal y financiera completa.'
          : 'Business formation and ongoing compliance with complete legal and financial protection.',
      });

      return {
        metadata: {
          title: locale === 'es' ? `Servicios Corporativos | ${siteName}` : `Corporate Services | ${siteName}`,
          description: locale === 'es'
            ? 'Desde la formación hasta el cumplimiento continuo, servicios corporativos completos para establecer, proteger y hacer crecer su negocio.'
            : 'From formation to ongoing compliance, comprehensive corporate services to establish, protect, and grow your business.',
          openGraph: {
            title: locale === 'es' ? `Servicios Corporativos | ${siteName}` : `Corporate Services | ${siteName}`,
            description: locale === 'es'
              ? 'Desde la formación hasta el cumplimiento continuo, servicios corporativos completos para establecer, proteger y hacer crecer su negocio.'
              : 'From formation to ongoing compliance, comprehensive corporate services to establish, protect, and grow your business.',
            url: `${siteUrl}/solutions/businesses/corporate-services`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
          alternates: {
            canonical: `${siteUrl}/solutions/businesses/corporate-services`,
            languages: {
              en: `${siteUrl}/en/solutions/businesses/corporate-services`,
              es: `${siteUrl}/es/solutions/businesses/corporate-services`,
            },
          },
        },
        jsonLd: corporateJsonLd,
      };

    case 'solutions-franchise':
      const franchiseJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: `${siteName} - ${locale === 'es' ? 'Oportunidades de Franquicia' : 'Franchise Opportunities'}`,
        url: `${siteUrl}/solutions/businesses/franchise-opportunities`,
        department: [{ '@type': 'Organization', name: 'Franchise Program' }],
        description: locale === 'es'
          ? 'Únase a nuestra familia de franquicias y construya un negocio rentable con capacitación y soporte integral.'
          : 'Join our franchise family and build a profitable business with comprehensive training and ongoing support.',
      });

      return {
        metadata: {
          title: locale === 'es' ? `Oportunidades de Franquicia | ${siteName}` : `Franchise Opportunities | ${siteName}`,
          description: locale === 'es'
            ? 'Modelo probado, múltiples fuentes de ingresos y soporte continuo para propietarios de franquicias.'
            : 'Proven model, multiple revenue streams, and ongoing support for franchise owners.',
          openGraph: {
            title: locale === 'es' ? `Oportunidades de Franquicia | ${siteName}` : `Franchise Opportunities | ${siteName}`,
            description: locale === 'es'
              ? 'Modelo probado, múltiples fuentes de ingresos y soporte continuo para propietarios de franquicias.'
              : 'Proven model, multiple revenue streams, and ongoing support for franchise owners.',
            url: `${siteUrl}/solutions/businesses/franchise-opportunities`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
          alternates: {
            canonical: `${siteUrl}/solutions/businesses/franchise-opportunities`,
            languages: {
              en: `${siteUrl}/en/solutions/businesses/franchise-opportunities`,
              es: `${siteUrl}/es/solutions/businesses/franchise-opportunities`,
            },
          },
        },
        jsonLd: franchiseJsonLd,
      };

    case 'solutions-business-tax':
      const bizTaxJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        serviceType: 'Business Tax & Accounting',
        provider: { '@type': 'Organization', name: siteName },
        areaServed: ['Georgia', 'Alabama', 'Texas'],
        description: locale === 'es'
          ? 'Impuestos comerciales, contabilidad, nómina y cumplimiento para su empresa.'
          : 'Business tax, accounting, payroll, and compliance solutions for your company.',
      });

      return {
        metadata: {
          title: locale === 'es' ? `Impuestos y Contabilidad Empresarial | ${siteName}` : `Business Tax & Accounting | ${siteName}`,
          description: locale === 'es'
            ? 'Preparación de impuestos, contabilidad, nómina y cumplimiento para ayudar a su negocio a prosperar.'
            : 'Tax preparation, bookkeeping, payroll, and compliance to help your business thrive.',
          openGraph: {
            title: locale === 'es' ? `Impuestos y Contabilidad Empresarial | ${siteName}` : `Business Tax & Accounting | ${siteName}`,
            description: locale === 'es'
              ? 'Preparación de impuestos, contabilidad, nómina y cumplimiento para ayudar a su negocio a prosperar.'
              : 'Tax preparation, bookkeeping, payroll, and compliance to help your business thrive.',
            url: `${siteUrl}/solutions/businesses/business-tax`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
          alternates: {
            canonical: `${siteUrl}/solutions/businesses/business-tax`,
            languages: {
              en: `${siteUrl}/en/solutions/businesses/business-tax`,
              es: `${siteUrl}/es/solutions/businesses/business-tax`,
            },
          },
        },
        jsonLd: bizTaxJsonLd,
      };

    case 'locations':
      const locationsJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        areaServed: ['Georgia', 'Alabama', 'Texas'],
        department: [
          { '@type': 'LocalBusiness', name: 'Georgia Office', address: 'Atlanta, GA' },
          { '@type': 'LocalBusiness', name: 'Alabama Office', address: 'Birmingham, AL' },
          { '@type': 'LocalBusiness', name: 'Texas Office', address: 'Houston, TX' },
        ],
        url: `${siteUrl}/locations`,
      });

      return {
        metadata: {
          title: locale === 'es' ? `Ubicaciones | ${siteName}` : `Locations | ${siteName}`,
          description: locale === 'es'
            ? 'Encuentre nuestras oficinas en Georgia, Alabama y Texas.'
            : 'Find our offices across Georgia, Alabama, and Texas.',
          openGraph: {
            title: locale === 'es' ? `Ubicaciones | ${siteName}` : `Locations | ${siteName}`,
            description: locale === 'es'
              ? 'Encuentre nuestras oficinas en Georgia, Alabama y Texas.'
              : 'Find our offices across Georgia, Alabama, and Texas.',
            url: `${siteUrl}/locations`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
          alternates: {
            canonical: `${siteUrl}/locations`,
            languages: {
              en: `${siteUrl}/en/locations`,
              es: `${siteUrl}/es/locations`,
            },
          },
        },
        jsonLd: locationsJsonLd,
      };

    case 'consultation':
      const consultationJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: `${siteName} - ${locale === 'es' ? 'Reservar Consulta' : 'Book a Consultation'}`,
        url: `${siteUrl}/consultation`,
        mainEntity: {
          '@type': 'Organization',
          name: siteName,
          url: siteUrl,
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: '+1-555-123-4567',
              contactType: 'customer service',
              areaServed: ['US'],
              availableLanguage: ['English', 'Spanish'],
            },
          ],
        },
      });

      return {
        metadata: {
          title: locale === 'es' ? `Reservar Consulta | ${siteName}` : `Book a Consultation | ${siteName}`,
          description:
            locale === 'es'
              ? 'Programe una consulta gratuita con nuestros expertos financieros. Respuesta en 24 horas.'
              : 'Schedule a free consultation with our financial experts. 24-hour response time.',
          openGraph: {
            title: locale === 'es' ? `Reservar Consulta | ${siteName}` : `Book a Consultation | ${siteName}`,
            description:
              locale === 'es'
                ? 'Programe una consulta gratuita con nuestros expertos financieros. Respuesta en 24 horas.'
                : 'Schedule a free consultation with our financial experts. 24-hour response time.',
            url: `${siteUrl}/consultation`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
          alternates: {
            canonical: `${siteUrl}/consultation`,
            languages: {
              en: `${siteUrl}/en/consultation`,
              es: `${siteUrl}/es/consultation`,
            },
          },
        },
        jsonLd: consultationJsonLd,
      };

    case 'terms':
      const termsJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${siteName} - Terms of Service`,
        url: `${siteUrl}/terms`,
      });
      return {
        metadata: {
          title: locale === 'es' ? `Términos del Servicio | ${siteName}` : `Terms of Service | ${siteName}`,
          description: locale === 'es' ? 'Lea nuestros términos y condiciones.' : 'Read our terms and conditions.',
          openGraph: {
            title: locale === 'es' ? `Términos del Servicio | ${siteName}` : `Terms of Service | ${siteName}`,
            description: locale === 'es' ? 'Lea nuestros términos y condiciones.' : 'Read our terms and conditions.',
            url: `${siteUrl}/terms`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
          alternates: {
            canonical: `${siteUrl}/terms`,
            languages: {
              en: `${siteUrl}/en/terms`,
              es: `${siteUrl}/es/terms`,
            },
          },
        },
        jsonLd: termsJsonLd,
      };

    case 'cookies':
      const cookiesJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${siteName} - Cookie Policy`,
        url: `${siteUrl}/cookies`,
      });
      return {
        metadata: {
          title: locale === 'es' ? `Política de Cookies | ${siteName}` : `Cookie Policy | ${siteName}`,
          description: locale === 'es' ? 'Conozca cómo usamos cookies y cómo gestionar sus preferencias.' : 'Learn how we use cookies and manage your preferences.',
          openGraph: {
            title: locale === 'es' ? `Política de Cookies | ${siteName}` : `Cookie Policy | ${siteName}`,
            description: locale === 'es' ? 'Conozca cómo usamos cookies y cómo gestionar sus preferencias.' : 'Learn how we use cookies and manage your preferences.',
            url: `${siteUrl}/cookies`,
            siteName,
            locale: locale === 'es' ? 'es_US' : 'en_US',
            type: 'website',
          },
          alternates: {
            canonical: `${siteUrl}/cookies`,
            languages: {
              en: `${siteUrl}/en/cookies`,
              es: `${siteUrl}/es/cookies`,
            },
          },
        },
        jsonLd: cookiesJsonLd,
      };

    default:
      const defaultJsonLd = generateJsonLd({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
      });

      return {
        metadata: {
          title: siteName,
          description: 'Professional Financial & Tax Services, With a Personal Touch!',
        },
        jsonLd: defaultJsonLd,
      };
  }
};

