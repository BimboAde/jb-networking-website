import { getT, type Dict } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const ConsultationSidebar = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'consultation.sidebar');
  const faq = [0, 1, 2, 3, 4].map((i) => ({
    q: t(`faq.${i}.q`),
    a: t(`faq.${i}.a`),
  }));

  return (
    <div className="space-y-8">
      <div className="bg-white border-2 border-brand-green rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-brand-green font-poppins mb-6">{t('quickContact.title')}</h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-brand-gray rounded-lg">
            <div className="w-12 h-12 bg-brand-green rounded-full" />
            <div>
              <h4 className="font-semibold text-brand-green">{t('quickContact.callTitle')}</h4>
              <p className="text-lg font-bold text-gray-900">{t('quickContact.phone')}</p>
              <p className="text-sm text-gray-600">{t('quickContact.hours')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-brand-gray rounded-lg">
            <div className="w-12 h-12 bg-brand-green rounded-full" />
            <div>
              <h4 className="font-semibold text-brand-green">{t('quickContact.emailTitle')}</h4>
              <p className="text-lg font-bold text-gray-900">{t('quickContact.email')}</p>
              <p className="text-sm text-gray-600">{t('quickContact.sla')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-brand-gray rounded-lg">
            <div className="w-12 h-12 bg-brand-gold rounded-full" />
            <div>
              <h4 className="font-semibold text-brand-green">{t('quickContact.bilingualTitle')}</h4>
              <p className="text-lg font-bold text-gray-900">{t('quickContact.bilingual')}</p>
              <p className="text-sm text-gray-600">{t('quickContact.bilingualNote')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-brand-gray rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-brand-green font-poppins mb-6">{t('faqTitle')}</h3>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <div key={i} className={`pb-4 ${i < faq.length - 1 ? 'border-b border-gray-300' : ''}`}>
              <h4 className="font-semibold text-brand-green mb-2">{item.q}</h4>
              <p className="text-gray-600 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-brand-green to-brand-light-green rounded-2xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">{t('trust.title')}</h3>
        <div className="grid grid-cols-2 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-brand-gold mb-2">{t(`trust.items.${i}.value`)}</div>
              <div className="text-sm text-green-100">{t(`trust.items.${i}.label`)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


