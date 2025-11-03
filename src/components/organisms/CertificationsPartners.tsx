import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const CertificationsPartners = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'about_page.certifications');
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold text-brand-green font-poppins mb-8">{t('certsTitle')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[0,1,2,3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-brand-green rounded-lg mx-auto mb-4" />
                  <h4 className="font-semibold text-brand-green mb-2">{t(`certs.${i}.title`)}</h4>
                  <p className="text-sm text-gray-600">{t(`certs.${i}.text`)}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-brand-green font-poppins mb-8">{t('membershipsTitle')}</h3>
            <div className="space-y-4">
              {[0,1,2,3,4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-lg flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-green rounded-lg" />
                  <div>
                    <h4 className="font-semibold text-brand-green">{t(`memberships.${i}.title`)}</h4>
                    <p className="text-sm text-gray-600">{t(`memberships.${i}.text`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-brand-green font-poppins mb-6 text-center">{t('partnersTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0,1,2].map((i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-brand-gray rounded-full mx-auto mb-4" />
                <h4 className="font-semibold text-brand-green mb-2">{t(`partners.${i}.title`)}</h4>
                <p className="text-sm text-gray-600">{t(`partners.${i}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


