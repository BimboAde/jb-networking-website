import { getT, type Dict } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { FaMapMarkerAlt } from 'react-icons/fa';

export const ConsultationOfficeLocations = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'consultation.offices');
  const offices = [0, 1, 2].map((i) => ({
    title: t(`items.${i}.title`),
    area: t(`items.${i}.area`),
    address: t(`items.${i}.address`),
    phone: t(`items.${i}.phone`),
    hours: t(`items.${i}.hours`),
    parking: t(`items.${i}.parking`),
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
                <p className="text-sm">{o.address}</p>
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


