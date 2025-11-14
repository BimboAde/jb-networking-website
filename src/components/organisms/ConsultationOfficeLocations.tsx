import { getT, type Dict } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { headers } from 'next/headers';

type ApiLocation = {
  id?: string;
  slug: string;
  name: string;
  area?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  phone?: string | null;
};

export const ConsultationOfficeLocations = async ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'consultation.offices');
  const hdrs = await headers();
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host') || '';
  const proto = hdrs.get('x-forwarded-proto') || (process.env.NODE_ENV === 'production' ? 'https' : 'http');
  const envBase =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  const baseUrl = envBase || (host ? `${proto}://${host}` : '');
  const res = await fetch(`${baseUrl}/api/v1/locations`, { cache: 'no-store' });
  const json = await res.json().catch(() => ({ data: [] as ApiLocation[] }));
  const apiLocations: ApiLocation[] = Array.isArray(json?.data) ? json.data : [];
  const offices = apiLocations.slice(0, 6).map((l) => ({
    title: l.name,
    area: l.area || '',
    address: [l.address_line1, l.address_line2].filter(Boolean).join('\n'),
    phone: l.phone || '',
  }));

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-lg text-gray-600">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((o, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-brand-green rounded-full mx-auto mb-4 text-white flex items-center justify-center">
                <FaMapMarkerAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-3 font-poppins">{o.title}</h3>
              <div className="space-y-2 text-gray-600 mb-4">
                <p className="font-medium">{o.area}</p>
                <p className="text-sm whitespace-pre-line">{o.address}</p>
                <p className="text-sm">{o.phone}</p>
              </div>
              {/* <div className="text-xs text-gray-500 space-y-1">
                <p>{o.hours}</p>
                <p>{o.parking}</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


