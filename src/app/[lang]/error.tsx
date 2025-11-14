'use client';

import type { FC } from 'react';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ErrorView } from '@/components/molecules/ErrorView';

type ErrorProps = {
	error: Error & { digest?: string; code?: string };
	reset: () => void;
};

const LangError: FC<ErrorProps> = ({ error }) => {
	const params = useParams<{ lang?: string }>();
	const lang = params?.lang ?? '';
	const homeHref = `/${lang}`;
	const code = (error as { code?: string }).code ?? error?.name ?? error?.digest ?? 'ERROR';
	const title = error?.message || 'Something went wrong';

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
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
	);
};

export default LangError;


