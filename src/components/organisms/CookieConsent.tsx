'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type ConsentStrings = {
  title: string;
  message: string;
  policyLabel: string;
  buttons: { acceptAll: string; reject: string; manage: string; save: string };
  categories: {
    essential: { title: string; text: string };
    functional: { title: string; text: string };
    analytics: { title: string; text: string };
    marketing: { title: string; text: string };
  };
};

type Props = {
  dict: Record<string, unknown>;
  inlineManageOnly?: boolean;
  policyHref?: string;
};

const COOKIE_NAME = 'jbns_consent_v1';

function getT(dict: Record<string, unknown>, path: string, fallback: string): string {
  const parts = path.split('.');
  let cur: any = dict;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
    else return fallback;
  }
  return typeof cur === 'string' ? cur : fallback;
}

export function CookieConsent({ dict, inlineManageOnly = false, policyHref = '/cookies' }: Props) {
  const strings: ConsentStrings = useMemo(() => ({
    title: getT(dict, 'cookie_consent.title', 'Your privacy matters'),
    message: getT(
      dict,
      'cookie_consent.message',
      'We use cookies to enhance your experience, analyze usage, and for marketing. You can manage your preferences.'
    ),
    policyLabel: getT(dict, 'cookie_consent.policyLabel', 'Cookie Policy'),
    buttons: {
      acceptAll: getT(dict, 'cookie_consent.buttons.acceptAll', 'Accept all'),
      reject: getT(dict, 'cookie_consent.buttons.reject', 'Reject non-essential'),
      manage: getT(dict, 'cookie_consent.buttons.manage', 'Manage preferences'),
      save: getT(dict, 'cookie_consent.buttons.save', 'Save preferences'),
    },
    categories: {
      essential: {
        title: getT(dict, 'cookie_consent.categories.essential.title', 'Essential'),
        text: getT(dict, 'cookie_consent.categories.essential.text', 'Required for the website to function.'),
      },
      functional: {
        title: getT(dict, 'cookie_consent.categories.functional.title', 'Functional'),
        text: getT(dict, 'cookie_consent.categories.functional.text', 'Enhances functionality and personalization.'),
      },
      analytics: {
        title: getT(dict, 'cookie_consent.categories.analytics.title', 'Analytics'),
        text: getT(dict, 'cookie_consent.categories.analytics.text', 'Helps us understand site usage and improve.'),
      },
      marketing: {
        title: getT(dict, 'cookie_consent.categories.marketing.title', 'Marketing / Sale/Share'),
        text: getT(
          dict,
          'cookie_consent.categories.marketing.text',
          'Used for ads and may be considered “sale/share” under US state privacy laws.'
        ),
      },
    },
  }), [dict]);

  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(inlineManageOnly);
  const [functional, setFunctional] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const match = document.cookie.split('; ').find((c) => c.startsWith(COOKIE_NAME + '='));
      if (!match && !inlineManageOnly) {
        setOpen(true);
        return;
      }
      if (match) {
        const val = decodeURIComponent(match.split('=')[1]);
        const parsed = JSON.parse(val);
        setFunctional(!!parsed.functional);
        setAnalytics(!!parsed.analytics);
        setMarketing(!!parsed.marketing);
      }
    } catch {}
  }, [inlineManageOnly]);

  function setCookie(values: { functional: boolean; analytics: boolean; marketing: boolean }) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(values))}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
    // Example: forward to Google Consent Mode v2 if present
    try {
      // @ts-ignore
      if (window.gtag) {
        // @ts-ignore
        window.gtag('consent', 'update', {
          ad_user_data: values.marketing ? 'granted' : 'denied',
          ad_personalization: values.marketing ? 'granted' : 'denied',
          ad_storage: values.marketing ? 'granted' : 'denied',
          analytics_storage: values.analytics ? 'granted' : 'denied',
          functionality_storage: values.functional ? 'granted' : 'denied',
          security_storage: 'granted',
        });
      }
    } catch {}
  }

  function acceptAll() {
    setFunctional(true);
    setAnalytics(true);
    setMarketing(true);
    setCookie({ functional: true, analytics: true, marketing: true });
    if (!inlineManageOnly) setOpen(false);
  }

  function rejectAll() {
    setFunctional(false);
    setAnalytics(false);
    setMarketing(false);
    setCookie({ functional: false, analytics: false, marketing: false });
    if (!inlineManageOnly) setOpen(false);
  }

  function save() {
    setCookie({ functional, analytics, marketing });
    if (!inlineManageOnly) setOpen(false);
  }

  const Panel = (
    <div className="bg-white rounded-xl shadow-xl p-5 w-full md:w-[560px] border border-gray-200">
      {!inlineManageOnly && <h3 className="text-brand-green font-bold text-lg mb-2">{strings.title}</h3>}
      {!inlineManageOnly && <p className="text-sm text-gray-700 mb-3">{strings.message} <Link href={policyHref} className="underline">{strings.policyLabel}</Link>.</p>}
      <div className="space-y-3">
        <div className="p-3 bg-brand-gray rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-brand-green">{strings.categories.essential.title}</div>
              <div className="text-sm text-gray-600">{strings.categories.essential.text}</div>
            </div>
            <input type="checkbox" checked readOnly className="w-5 h-5" />
          </div>
        </div>
        <div className="p-3 bg-brand-gray rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-brand-green">{strings.categories.functional.title}</div>
              <div className="text-sm text-gray-600">{strings.categories.functional.text}</div>
            </div>
            <input type="checkbox" checked={functional} onChange={(e) => setFunctional(e.target.checked)} className="w-5 h-5" />
          </div>
        </div>
        <div className="p-3 bg-brand-gray rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-brand-green">{strings.categories.analytics.title}</div>
              <div className="text-sm text-gray-600">{strings.categories.analytics.text}</div>
            </div>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="w-5 h-5" />
          </div>
        </div>
        <div className="p-3 bg-brand-gray rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-brand-green">{strings.categories.marketing.title}</div>
              <div className="text-sm text-gray-600">{strings.categories.marketing.text}</div>
            </div>
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-end mt-4">
        {!inlineManageOnly && (
          <button onClick={rejectAll} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-800">{strings.buttons.reject}</button>
        )}
        <button onClick={save} className="px-4 py-2 bg-brand-green text-white rounded-lg">{strings.buttons.save}</button>
      </div>
    </div>
  );

  if (inlineManageOnly) return Panel;

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6 flex justify-center">
      <div className="w-full md:w-auto space-y-3">
        <div className="bg-white rounded-xl shadow-xl p-5 w-full md:w-[720px] border border-gray-200">
          <h3 className="text-brand-green font-bold text-lg mb-1">{strings.title}</h3>
          <p className="text-sm text-gray-700 mb-3">{strings.message} <Link href={policyHref} className="underline">{strings.policyLabel}</Link>.</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={acceptAll} className="px-4 py-2 bg-brand-green text-white rounded-lg">{strings.buttons.acceptAll}</button>
            <button onClick={rejectAll} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-800">{strings.buttons.reject}</button>
            <button onClick={() => setManage((v) => !v)} className="px-4 py-2 border border-brand-green text-brand-green rounded-lg">{strings.buttons.manage}</button>
          </div>
        </div>
        {manage && (
          <div className="flex justify-center">
            {Panel}
          </div>
        )}
      </div>
    </div>
  );
}


