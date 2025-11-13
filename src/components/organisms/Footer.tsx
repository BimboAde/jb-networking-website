import { getT, type Dict } from "@/lib/i18n-server";
import Link from "next/link";
import {
  MapPin,
} from "lucide-react";
import { Logo } from "../atoms/Logo";
import { getImageByLabel } from "@/lib/media";
import { FooterDynamicInfo } from "./FooterDynamicInfo";

export const Footer = async ({ dict, lang }: { dict: Dict; lang?: string }) => {
  const t = getT(dict, "footer");
  const tHeader = getT(dict, "header");
  const logo = await getImageByLabel("logo");

  const withLang = (path: string) => {
    const cleaned = path.startsWith("/") ? path : `/${path}`;
    return lang ? `/${lang}${cleaned}`.replace(/\/+$|\/+$/g, "/") : cleaned;
  };

  // social links are rendered from FooterDynamicInfo when available
  const individualServices = [
    {
      label: tHeader("individualServices.personalTaxAccounting"),
      href: withLang("/solutions/individuals/tax-client-intake"),
    },
    {
      label: tHeader("individualServices.financialInvestmentPlanning"),
      href: withLang("/solutions/individuals/financial-insurance-planning"),
    },
    {
      label: tHeader("individualServices.creditDebtResolution"),
      href: withLang("/solutions/individuals/credit-debt-resolution"),
    },
    {
      label: tHeader("individualServices.personalRealEstateInsurance"),
      href: withLang("/solutions/individuals/real-estate-mortgage"),
    },
  ];

  const businessServices = [
    {
      label: tHeader("businessServices.businessTaxAccounting"),
      href: withLang("/solutions/businesses/business-accountant-services"),
    },
    // { label: t('businessServices.businessCreditBuilding'), href: withLang('/solutions/businesses/business-credit-building') },
    {
      label: tHeader("businessServices.corporateServices"),
      href: withLang("/solutions/businesses/corporate-services"),
    },
    {
      label: tHeader("businessServices.executiveServices"),
      href: withLang("/solutions/businesses/executive-services"),
    },
  ];

  return (
    <footer className="bg-brand-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Logo
              companyName={t("companyName")}
              tagline={t("companyTagline")}
              src={
                (logo as unknown as { image_url?: string; src?: string })?.image_url ||
                (logo as unknown as { image_url?: string; src?: string })?.src ||
                "/jblogo.png"
              }
              alt={
                (logo as unknown as { image_alt?: string; alt?: string })?.image_alt ||
                (logo as unknown as { image_alt?: string; alt?: string })?.alt ||
                "JB Networking Systems Logo"
              }
              type="dark"
            />
            <p className="text-gray-300">{t("description")}</p>
          </div>

          <div>
            <Link href={withLang("/solutions/individuals")}>
              <h4 className="text-lg font-semibold mb-6 font-poppins">
                {t("sections.individualServices")}
              </h4>
            </Link>
            <ul className="space-y-3">
              {individualServices.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Link href={withLang("/solutions/businesses")}>
              <h4 className="text-lg font-semibold mb-6 font-poppins">
                {t("sections.businessServices")}
              </h4>
            </Link>
            <ul className="space-y-3">
              {businessServices.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 font-poppins">
              {t("sections.contactInfo")}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-brand-green mt-1 w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{t("contact.locations")}</p>
                  <p className="text-sm text-gray-400">
                    {t("contact.locationsList")}
                  </p>
                </div>
              </div>
              <FooterDynamicInfo />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap items-center space-x-6 mb-4 md:mb-0">
              <p className="text-gray-300">
                © {new Date().getFullYear()} JB Networking Systems LLC. All
                rights reserved. <br /> Website designed and developed by{" "}
                <a
                  href="https://salitastech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  Salitas Technology Solutions
                </a>
                .
              </p>
              <Link
                href={withLang("/cookies")}
                className="text-gray-400 hover:text-white text-sm"
              >
                {t("links.privacyPolicy")}
              </Link>
              <Link
                href={withLang("/terms")}
                className="text-gray-400 hover:text-white text-sm"
              >
                {t("links.termsOfService")}
              </Link>
              {/* <Link href="#" className="text-gray-400 hover:text-white text-sm">
                {t('links.accessibility')}
              </Link> */}
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-brand-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                {t("badges.hablamosEspanol")}
              </span>
              <span className="bg-brand-green text-white px-3 py-1 rounded-full text-sm font-medium">
                {t("badges.militaryDiscounts")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
