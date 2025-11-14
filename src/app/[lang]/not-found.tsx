'use client';

import type { FC } from 'react';
import { ErrorView } from '@/components/molecules/ErrorView';

const LocaleNotFound: FC = () => {
	return (
		<ErrorView
			code="404"
			title="This page could not be found."
			homeHref="/en"
			onBack={() => {
				if (typeof window !== 'undefined') {
					window.history.back();
				}
			}}
		/>
	);
};

export default LocaleNotFound;


