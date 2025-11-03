import { getT, type Dict } from '@/lib/i18n-server';

export const ConsultationHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'consultation.hero');
  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white h-[400px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center mb-8" />
          <h1 className="text-4xl sm:text-5xl font-bold font-poppins mb-6">{t('title')}</h1>
          <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
      </div>
    </section>
  );
};


