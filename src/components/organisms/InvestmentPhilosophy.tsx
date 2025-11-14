import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import Image from 'next/image';
import { images } from '@/data/images';
import { Target, Layers, RefreshCw, ShieldCheck } from 'lucide-react';

export const InvestmentPhilosophy = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_financial.philosophy');
  const IconComponents = [Target, Layers, RefreshCw, ShieldCheck];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Heading level={2} className="mb-6 text-brand-green">{t('title')}</Heading>
            <p className="text-xl text-gray-600 mb-8">{t('description')}</p>
            <div className="space-y-6">
              {[0,1,2,3].map((i) => {
                const Icon = IconComponents[i];
                return (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-brand-green mb-2">{t(`items.${i}.title`)}</h4>
                      <p className="text-gray-600">{t(`items.${i}.text`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-brand-gray rounded-2xl p-4 sm:p-6 lg:p-8">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={images.solutions.financialPlanning.investmentPhilosophyImage.src}
                alt={images.solutions.financialPlanning.investmentPhilosophyImage.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


