import { getT, type Dict } from '@/lib/i18n-server';
import { MotionDiv } from '../atoms/Motion';
import { Heading } from '../atoms/Heading';
import { TestimonialCard } from '../molecules/TestimonialCard';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { getServerSupabase } from '@/lib/supabase/server';

export const TestimonialsSection = async ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'testimonials');
  type DbTestimonial = { name: string; role?: string | null; text: string; avatar_url?: string | null };
  let list:
    | Array<{ name: string; role: string; text: string; avatarUrl: string }>
    | null = null;
  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from('testimonials')
      .select('name, role, text, avatar_url')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });
    if (!error && data) {
      list = data.map((d: DbTestimonial) => ({
        name: d.name,
        role: d.role || '',
        text: d.text,
        avatarUrl: d.avatar_url || '',
      }));
    }
  } catch {}

  const testimonials: Array<{ name: string; role: string; text: string; avatarUrl: string }> =
    list && list.length > 0
      ? list
      : [
          {
            name: t('maria.name'),
            role: t('maria.role'),
            text: t('maria.text'),
            avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
          },
          {
            name: t('james.name'),
            role: t('james.role'),
            text: t('james.text'),
            avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
          },
          {
            name: t('sarah.name'),
            role: t('sarah.role'),
            text: t('sarah.text'),
            avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
          },
          {
            name: t('michael.name'),
            role: t('michael.role'),
            text: t('michael.text'),
            avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
          },
          {
            name: t('lisa.name'),
            role: t('lisa.role'),
            text: t('lisa.text'),
            avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
          },
          {
            name: t('robert.name'),
            role: t('robert.role'),
            text: t('robert.text'),
            avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
          },
        ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <Heading level={2} className="mb-4">
            {t('title')}
          </Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </MotionDiv>

        <MotionDiv
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <MotionDiv key={index} variants={fadeInUp}>
              <TestimonialCard {...testimonial} />
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
};

