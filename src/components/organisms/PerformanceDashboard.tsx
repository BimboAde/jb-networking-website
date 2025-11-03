import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { PerformanceLineChart } from '../charts/PerformanceLineChart';

export const PerformanceDashboard = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_financial.performance');
  const data = [
    { year: '2019', portfolio: 100000, sp500: 100000, benchmark: 100000 },
    { year: '2020', portfolio: 95000, sp500: 98000, benchmark: 102000 },
    { year: '2021', portfolio: 125000, sp500: 128000, benchmark: 118000 },
    { year: '2022', portfolio: 115000, sp500: 112000, benchmark: 108000 },
    { year: '2023', portfolio: 140000, sp500: 135000, benchmark: 125000 },
    { year: '2024', portfolio: 158000, sp500: 152000, benchmark: 142000 },
  ];
  const series = [
    { name: t('series.portfolio'), dataKey: 'portfolio', color: '#2D5016' },
    { name: t('series.sp500'), dataKey: 'sp500', color: '#4A7C3A' },
    { name: t('series.benchmark'), dataKey: 'benchmark', color: '#D4A853' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-brand-gray rounded-2xl p-8">
            <Heading level={3} className="mb-6 text-brand-green">{t('chartTitle')}</Heading>
            <PerformanceLineChart data={data} xKey="year" series={series} />
          </div>
          <div className="space-y-6">
            <div className="bg-brand-gray rounded-xl p-6">
              <Heading level={4} className="text-brand-green mb-4">{t('metrics.title')}</Heading>
              {[0,1,2,3].map((i) => (
                <div key={i} className="flex justify-between items-center mb-4 last:mb-0">
                  <span className="text-gray-600">{t(`metrics.items.${i}.label`)}</span>
                  <span className={`font-semibold ${i===2 ? 'text-brand-gold' : 'text-brand-green'}`}>{t(`metrics.items.${i}.value`)}</span>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-brand-green to-brand-light-green rounded-xl p-6 text-white">
              <Heading level={4} className="mb-2 text-white">{t('nextReview.title')}</Heading>
              <p className="text-green-100 mb-4">{t('nextReview.subtitle')}</p>
              <div className="text-2xl font-bold text-brand-gold">{t('nextReview.date')}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[0,1,2,3].map((i) => (
            <div key={i} className="bg-white border-2 border-brand-green rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-brand-green mb-1">{t(`highlights.items.${i}.value`)}</div>
              <div className="text-gray-600">{t(`highlights.items.${i}.label`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


