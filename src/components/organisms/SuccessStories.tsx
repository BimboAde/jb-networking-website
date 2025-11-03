import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { TestimonialCard } from '../molecules/TestimonialCard';

export const SuccessStories = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_individual.success');

  const stories = [0,1,2,3].map((i) => {
    const name = t(`stories.${i}.name`);
    const role = t(`stories.${i}.role`);
    const text = t(`stories.${i}.quote`);
    const rawAvatar = t(`stories.${i}.avatar`);
    const avatarUrl = typeof rawAvatar === 'string' && /^https?:\/\//.test(rawAvatar)
      ? rawAvatar
      : '/vercel.svg';
    return { name, role, text, avatarUrl };
  });

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-8 shadow-lg">
              <TestimonialCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


