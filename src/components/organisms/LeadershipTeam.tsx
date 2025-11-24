import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import Image from 'next/image';
import { headers } from 'next/headers';

type ApiMember = {
  id?: string;
  name: string;
  role?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  linkedin_url?: string | null;
  email?: string | null;
};

type ApiResponse = {
  data?: ApiMember[];
};

type Member = {
  name: string;
  role?: string;
  bio?: string;
  avatar?: string;
};

const getTeamMembers = async (): Promise<Member[] | null> => {
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

    if (!host) {
      return null;
    }

    const url = `${protocol}://${host}/api/v1/team-members`;

    const res = await fetch(url, {
      // Always hit the API, do not use cached response
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const json = (await res.json()) as ApiResponse;
    if (!json.data || !Array.isArray(json.data)) {
      return null;
    }

    return json.data.map((m) => ({
      name: m.name,
      role: m.role ?? '',
      bio: m.bio ?? '',
      avatar: m.avatar_url ?? '',
    }));
  } catch {
    // On any error, fall back to dictionary-defined members in the component
    return null;
  }
};

export const LeadershipTeam = async ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'about_page.leadership');

  const members: Member[] | null = await getTeamMembers();

  if (!members || members.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Heading level={2} className="mb-4 text-brand-green">
              {t('title')}
            </Heading>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
          </div>
          <p className="text-center text-gray-500 mt-8">{t('no_members')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">
            {t('title')}
          </Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {members.map((m, idx) => {
            const avatarSrc =
              typeof m.avatar === 'string' && (m.avatar.startsWith('http') || m.avatar.startsWith('/'))
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
                  <a className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center text-white">
                    in
                  </a>
                  <a className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center text-white">
                    ✉️
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


