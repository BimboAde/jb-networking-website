'use client';

import dynamic from 'next/dynamic';
import type { FC, ComponentType } from 'react';

type AnyComponent = ComponentType<Record<string, unknown>>;
const PieChart = dynamic<Record<string, unknown>>(() => import('recharts').then(m => ({ default: m.PieChart as unknown as AnyComponent })), { ssr: false });
const Pie = dynamic<Record<string, unknown>>(() => import('recharts').then(m => ({ default: m.Pie as unknown as AnyComponent })), { ssr: false });
const Cell = dynamic<Record<string, unknown>>(() => import('recharts').then(m => ({ default: m.Cell as unknown as AnyComponent })), { ssr: false });
const Tooltip = dynamic<Record<string, unknown>>(() => import('recharts').then(m => ({ default: m.Tooltip as unknown as AnyComponent })), { ssr: false });
const ResponsiveContainer = dynamic<Record<string, unknown>>(() => import('recharts').then(m => ({ default: m.ResponsiveContainer as unknown as AnyComponent })), { ssr: false });

type PieDatum = { name: string; value: number };

export const PortfolioPieChart: FC<{ data: PieDatum[]; colors?: string[] }> = ({ data, colors = ['#2D5016', '#4A7C3A', '#D4A853', '#1E3A5F', '#6B7280'] }) => {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={120} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};


