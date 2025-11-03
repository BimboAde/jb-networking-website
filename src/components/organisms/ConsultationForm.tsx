'use client';

import { useEffect, useMemo, useState } from 'react';

type Strings = {
  title: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredLocation: string;
  preferredLanguage: string;
  servicesOfInterest: string;
  preferredDate: string;
  preferredTime: string;
  about: string;
  military: string;
  marketingConsent: string;
  freeConsent: string;
  submit: string;
  success: string;
  requiredError: string;
  serverError: string;
};

type Options = {
  locations: string[];
  languages: string[];
  timeSlots: string[];
  services: string[];
};

export function ConsultationForm({ strings, options }: { strings: Strings; options: Options }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState(options.languages[0] ?? '');
  const [services, setServices] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [about, setAbout] = useState('');
  const [isMilitary, setIsMilitary] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [freeConsent, setFreeConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  useEffect(() => {
    setDate(today);
  }, [today]);

  function toggleService(value: string) {
    setServices((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }

  function formatPhone(input: string) {
    const digits = input.replace(/\D/g, '').slice(0, 10);
    if (digits.length >= 7) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length >= 4) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length >= 1) return `(${digits}`;
    return '';
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!firstName || !lastName || !email || !phone || !location || !freeConsent) {
      setError(strings.requiredError);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          location,
          language,
          services,
          date,
          time,
          about,
          isMilitary,
          marketing,
          freeConsent,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSuccess(strings.success);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setLocation('');
      setLanguage(options.languages[0] ?? '');
      setServices([]);
      setDate(today);
      setTime('');
      setAbout('');
      setIsMilitary(false);
      setMarketing(false);
      setFreeConsent(false);
    } catch (e) {
      setError(strings.serverError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-brand-gray rounded-2xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-brand-green font-poppins mb-4">{strings.title}</h2>
        <p className="text-gray-600">{strings.description}</p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit} noValidate>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-700 text-sm">{success}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{strings.firstName} *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{strings.lastName} *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{strings.email} *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{strings.phone} *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{strings.preferredLocation} *</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
            >
              <option value="">—</option>
              {options.locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{strings.preferredLanguage}</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
            >
              {options.languages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{strings.servicesOfInterest}</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {options.services.map((s) => (
              <label key={s} className="flex items-center">
                <input
                  type="checkbox"
                  checked={services.includes(s)}
                  onChange={() => toggleService(s)}
                  className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
                />
                <span className="ml-2 text-sm text-gray-700">{s}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{strings.preferredDate}</label>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{strings.preferredTime}</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
            >
              <option value="">—</option>
              {options.timeSlots.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{strings.about}</label>
          <textarea
            rows={4}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
            placeholder="Describe your goals or challenges..."
          />
        </div>

        <div className="space-y-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={isMilitary}
              onChange={(e) => setIsMilitary(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-brand-green focus:ring-brand-green"
            />
            <span className="ml-2 text-sm text-gray-700">{strings.military}</span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-brand-green focus:ring-brand-green"
            />
            <span className="ml-2 text-sm text-gray-700">{strings.marketingConsent}</span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              checked={freeConsent}
              onChange={(e) => setFreeConsent(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-brand-green focus:ring-brand-green"
            />
            <span className="ml-2 text-sm text-gray-700">{strings.freeConsent}</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-green text-white py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-green transition-colors"
        >
          {submitting ? '…' : strings.submit}
        </button>
      </form>
    </div>
  );
}


