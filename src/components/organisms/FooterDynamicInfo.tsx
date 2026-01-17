'use client';
import { useEffect, useState } from 'react';
import { getWebsiteInfoFromCache, ensureWebsiteInfoCached, WebsiteInfo } from '@/lib/website-info-client';
import { Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram, MapPin } from 'lucide-react';

export function FooterDynamicInfo() {
  const [info, setInfo] = useState<WebsiteInfo | null>(() => {
    try {
      return getWebsiteInfoFromCache();
    } catch {
      return null;
    }
  });
  useEffect(() => {
    if (!info) {
      ensureWebsiteInfoCached().then((v) => v && setInfo(v)).catch(() => {});
    }
  }, [info]);
  if (!info) return null;
  const socials = [
    { icon: Facebook, href: info.facebook },
    { icon: Twitter, href: info.x_url },
    { icon: Linkedin, href: info.linkedin },
    { icon: Instagram, href: info.instagram },
  ].filter((s) => !!s.href);
  const hasAddress = info.main_address_line1 || info.main_address_line2;

  return (
    <>
      <div className="space-y-2">
        {hasAddress && (
          <div className="flex items-start space-x-3">
            <MapPin className="text-white w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="text-gray-300">
              {info.main_address_line1 && <div>{info.main_address_line1}</div>}
              {info.main_address_line2 && <div>{info.main_address_line2}</div>}
            </div>
          </div>
        )}
        {info.main_phone && (
          <div className="flex items-center space-x-3">
            <Phone className="text-white w-5 h-5 flex-shrink-0" />
            <a className="text-gray-300 hover:text-white" href={`tel:${String(info.main_phone).replace(/[^\d]/g, '')}`}>{info.main_phone}</a>
          </div>
        )}
        {info.main_email && (
          <div className="flex items-center space-x-3">
            <Mail className="text-white w-5 h-5 flex-shrink-0" />
            <a className="text-gray-300 hover:text-white" href={`mailto:${info.main_email}`}>{info.main_email}</a>
          </div>
        )}
        {(info.weekday_hours || info.weekend_hours) && (
          <div className="flex items-start space-x-3">
            <Clock className="text-white w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="text-gray-300">
              {info.weekday_hours && <div>{info.weekday_hours}</div>}
              {info.weekend_hours && <div>{info.weekend_hours}</div>}
            </div>
          </div>
        )}
      </div>
      {socials.length > 0 && (
        <div className="flex space-x-4 mt-4">
          {socials.map((s, i) => (
            <a key={i} href={s.href as string} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center hover:bg-brand-light-green transition-colors">
              <s.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      )}
    </>
  );
}


