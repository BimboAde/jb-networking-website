'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type AnimationProviderProps = {
  children: ReactNode;
};

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  return <>{children}</>;
};

