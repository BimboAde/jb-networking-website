'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import type { FC } from 'react';
import { Logo } from '../atoms/Logo';
import { COMPANY } from '@/data/constants';
import { images } from '@/data/images';

type ErrorViewProps = {
	code: string;
	title: string;
	description?: string;
	homeHref: string;
	onBack?: () => void;
};

export const ErrorView: FC<ErrorViewProps> = ({ code, title, description, homeHref, onBack }) => {
	return (
		<div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
			<header className="w-full border-b bg-white/80 backdrop-blur">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
				<Logo companyName={COMPANY.name} tagline={COMPANY.tagline} src={images.logo.src || '/jblogo.png'} alt={images.logo.alt || 'JB Networking Systems Logo'} />

				</div>
			</header>

			<main className="flex-1 flex items-center">
				<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 w-full">
					<div className="flex flex-col items-center text-center">
						<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
							<AlertTriangle aria-hidden className="h-8 w-8" />
						</div>
						<p className="text-sm uppercase tracking-widest text-gray-500">Error</p>
						<h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
							<span className="text-red-600">{code}</span> · {title}
						</h1>
						{description ? (
							<p className="mt-4 max-w-2xl text-base sm:text-lg text-gray-600">{description}</p>
						) : null}

						<div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
							<button
								type="button"
								onClick={onBack}
								className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-40"
							>
								Go Back
							</button>
							<Link
								href={homeHref}
								className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
							>
								Go to Homepage
							</Link>
						</div>
					</div>
				</div>
			</main>

			<footer className="w-full border-t bg-white/80 backdrop-blur">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-sm text-gray-600">
					<p>© {new Date().getFullYear()} JB Networking Systems LLC</p>
					<div className="hidden sm:flex gap-4">
						{(() => {
							const match = /^\/([^/]+)/.exec(homeHref);
							const lang = match?.[1] ?? '';
							return (
								<>
									<Link href={`/${lang}/cookies`}>Cookie Policy</Link>
									<Link href={`/${lang}/terms`}>Terms</Link>
									<Link href={`/${lang}/accessibility`}>Accessibility</Link>
								</>
							);
						})()}
					</div>
				</div>
			</footer>
		</div>
	);
};


