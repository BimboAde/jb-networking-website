'use client';

import type { FC } from 'react';
import { usePathname } from 'next/navigation';
import { ErrorView } from '@/components/molecules/ErrorView';

const NotFound: FC = () => {
	const pathname = usePathname() || '/';
	const match = /^\/([^/]+)/.exec(pathname);
	const maybeLang = match?.[1];
	const lang = maybeLang && ['en', 'es'].includes(maybeLang) ? maybeLang : 'en';

	return (
		<ErrorView
			code="404"
			title="This page could not be found."
			homeHref={`/${lang}`}
			onBack={() => {
				if (typeof window !== 'undefined') {
					window.history.back();
				}
			}}
		/>
	);
};

export default NotFound;



