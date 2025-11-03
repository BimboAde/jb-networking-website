import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { PortfolioPieChart } from '../charts/PortfolioPieChart';

export const InvestmentPhilosophy = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_financial.philosophy');
  const chartData = [
    { name: t('chart.labels.0'), value: 60 },
    { name: t('chart.labels.1'), value: 25 },
    { name: t('chart.labels.2'), value: 10 },
    { name: t('chart.labels.3'), value: 5 },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Heading level={2} className="mb-6 text-brand-green">{t('title')}</Heading>
            <p className="text-xl text-gray-600 mb-8">{t('description')}</p>
            <div className="space-y-6">
              {[0,1,2,3].map((i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-brand-green mb-2">{t(`items.${i}.title`)}</h4>
                    <p className="text-gray-600">{t(`items.${i}.text`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-brand-gray rounded-2xl p-8">
            <Heading level={3} className="mb-6 text-brand-green text-center">{t('chart.title')}</Heading>
            <PortfolioPieChart data={chartData} />
            <div className="grid grid-cols-2 gap-4 text-center mt-6">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-2xl font-bold text-brand-green">65%</div>
                <div className="text-sm text-gray-600">{t('chart.summaryGrowth')}</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-2xl font-bold text-brand-green">35%</div>
                <div className="text-sm text-gray-600">{t('chart.summaryConservative')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


