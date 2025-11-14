import { type Dict, getT } from "@/lib/i18n-server";
import { Heading } from "../atoms/Heading";
import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";

function OfficeCard({
  id,
  name,
  area: _area,
  address: _address,
  phone,
  email,
  hours,
  specialties: _specialties,
  buttons,
  bookLink,
}: {
  id: string;
  name: string;
  area: string;
  address: string[];
  phone: string;
  email: string;
  hours: string[];
  specialties: string[];
  buttons: { directions: string; book: string };
  bookLink?: string;
}) {
  return (
    <div
      id={id}
      className="office-card bg-white rounded-2xl shadow-xl overflow-hidden scroll-mt-24"
    >
      <div className="h-48 bg-gradient-to-br from-brand-green to-brand-light-green flex items-center justify-center">
        <div className="text-center text-white">
          {/* <div className="text-4xl mb-3">🏢</div> */}
          <h3 className="text-2xl font-bold font-poppins">{name}</h3>
          {/* <p className="text-green-100">{area}</p> */}
        </div>
      </div>
      <div className="p-8">
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            {/* <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0 text-white">
              📍
            </div> */}
            {/* <div>
              <h4 className="font-semibold text-brand-green mb-1">Address</h4>
              <p className="text-gray-600">{address[0]}<br />{address[1]}</p>
            </div> */}
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0 text-white">
              📞
            </div>
            <div>
              <h4 className="font-semibold text-brand-green mb-1">Phone</h4>
              <p className="text-gray-600">{phone}</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0 text-white">
              ✉️
            </div>
            <div>
              <h4 className="font-semibold text-brand-green mb-1">Email</h4>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
         
          <div className="flex space-x-3">
            {/* <button className="flex-1 bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-brand-light-green transition-colors">
              {buttons.directions}
            </button> */}
            <button className="flex-1 border-2 border-brand-green text-brand-green py-3 rounded-lg font-semibold hover:bg-brand-green hover:text-white transition-colors">
            <Link href={bookLink || '/en/consultation'} target="_blank"> {buttons.book} </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type ApiLocation = {
  id: string;
  slug: string;
  name: string;
  area?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  phone?: string | null;
  email?: string | null;
  hours?: string[] | null;
  specialties?: string[] | null;
};

export const OfficesGrid = async ({ dict, bookLink }: { dict: Dict; bookLink?: string }) => {
  const t = getT(dict, "locations_page.offices");
  let items: Array<{
    id: string;
    name: string;
    area: string;
    address: string[];
    phone: string;
    email: string;
    hours: string[];
    specialties: string[];
  }> = [];
  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from('locations')
      .select('slug, name, area, address_line1, address_line2, phone, email, hours, specialties')
      .order('slug', { ascending: true });
    const list = (!error && Array.isArray(data) ? (data as ApiLocation[]) : []) as ApiLocation[];
    items = list.map((loc) => ({
      id: loc.slug as string,
      name: loc.name as string,
      area: (loc.area as string) || '',
      address: [loc.address_line1 || '', loc.address_line2 || ''].filter(Boolean),
      phone: (loc.phone as string) || '',
      email: (loc.email as string) || '',
      hours: Array.isArray(loc.hours) ? loc.hours : [],
      specialties: Array.isArray(loc.specialties) ? loc.specialties : [],
    }));
  } catch {
    // Fallback to translations if API is unavailable
    items = [0, 1, 2].map((i) => ({
      id: i === 0 ? "georgia" : i === 1 ? "alabama" : "texas",
      name: t(`items.${i}.name`),
      area: t(`items.${i}.area`),
      address: [t(`items.${i}.address.0`), t(`items.${i}.address.1`)],
      phone: t(`items.${i}.phone`),
      email: t(`items.${i}.email`),
      hours: [0, 1, 2].map((j) => t(`items.${i}.hours.${j}`)),
      specialties: [0, 1, 2, 3].map((j) => t(`items.${i}.specialties.${j}`)),
    }));
  }
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">
            {t("title")}
          </Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {items.map((it, idx) => (
            <OfficeCard
              key={idx}
              id={it.id}
              name={it.name}
              area={it.area}
              address={it.address}
              phone={it.phone}
              email={it.email}
              hours={it.hours}
              specialties={it.specialties}
              buttons={{
                directions: t("buttons.directions"),
                book: t("buttons.book"),
              }}
              bookLink={bookLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
