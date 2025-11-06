import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import Image from 'next/image';

export const LeadershipTeam = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'about_page.leadership');
  const members = [0,1,2,3,4,5].map((i) => ({
    name: t(`members.${i}.name`),
    role: t(`members.${i}.role`),
    bio: t(`members.${i}.bio`),
    avatar: t(`members.${i}.avatar`),
  }));
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {members.map((m, idx) => {
            const avatarSrc = typeof m.avatar === 'string' && (m.avatar.startsWith('http') || m.avatar.startsWith('/'))
              ? m.avatar
              : '/jblogo.png';
            const alt = typeof m.name === 'string' ? m.name : 'Team member';
            return (
            <div key={idx} className="bg-brand-gray rounded-2xl p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden relative">
                <Image src={avatarSrc} alt={alt} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-2 font-poppins">{m.name}</h3>
              <p className="text-brand-gold font-semibold mb-4">{m.role}</p>
              <p className="text-gray-600 mb-4">{m.bio}</p>
              <div className="flex justify-center space-x-3">
                <a className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center text-white">in</a>
                <a className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center text-white">✉️</a>
              </div>
            </div>
            );
          })}
        </div>
        {/* <div className="bg-gradient-to-r from-brand-green to-brand-light-green rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4 font-poppins">{t('cta.title')}</h3>
          <p className="text-lg text-green-100 mb-6 max-w-3xl mx-auto">{t('cta.text')}</p>
          <button className="bg-white text-brand-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">{t('cta.button')}</button>
        </div> */}
      </div>
    </section>
  );
};


