'use client';

import type { FC } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ErrorView } from '@/components/molecules/ErrorView';

type GlobalErrorProps = {
	error: Error & { digest?: string; code?: string };
	reset: () => void;
};

const GlobalError: FC<GlobalErrorProps> = ({ error }) => {
	const pathname = usePathname() || '/';
	const match = /^\/([^/]+)/.exec(pathname);
	const maybeLang = match?.[1];
	const lang = maybeLang && ['en', 'es'].includes(maybeLang) ? maybeLang : 'en';
	const homeHref = `/${lang}`;
	const code = (error as { code?: string }).code ?? error?.name ?? error?.digest ?? 'ERROR';
	const title = error?.message || 'Something went wrong';

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html lang={lang}>
			<body>
				<ErrorView
					code={String(code)}
					title={title}
					homeHref={homeHref}
					onBack={() => {
						if (typeof window !== 'undefined') {
							window.history.back();
						}
					}}
				/>
			</body>
		</html>
	);
};

export default GlobalError;


