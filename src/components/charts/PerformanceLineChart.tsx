'use client';

import dynamic from 'next/dynamic';
import type { FC, ComponentType } from 'react';

type AnyComponent = ComponentType<Record<string, unknown>>;
const ResponsiveContainer = dynamic<Record<string, unknown>>(() => import('recharts').then(m => ({ default: m.ResponsiveContainer as unknown as AnyComponent })), { ssr: false });
const LineChart = dynamic<Record<string, unknown>>(() => import('recharts').then(m => ({ default: m.LineChart as unknown as AnyComponent })), { ssr: false });
const Line = dynamic<Record<string, unknown>>(() => import('recharts').then(m => ({ default: m.Line as unknown as AnyComponent })), { ssr: false });
const XAxis = dynamic<Record<string, unknown>>(() => import('recharts').then(m => ({ default: m.XAxis as unknown as AnyComponent })), { ssr: false });
const YAxis = dynamic<Record<string, unknown>>(() => import('recharts').then(m => ({ default: m.YAxis as unknown as AnyComponent })), { ssr: false });
const Tooltip = dynamic<Record<string, unknown>>(() => import('recharts').then(m => ({ default: m.Tooltip as unknown as AnyComponent })), { ssr: false });
const Legend = dynamic<Record<string, unknown>>(() => import('recharts').then(m => ({ default: m.Legend as unknown as AnyComponent })), { ssr: false });

type Series = { name: string; dataKey: string; color: string };

export const PerformanceLineChart: FC<{ data: Record<string, number | string>[]; xKey: string; series: Series[] }> = ({ data, xKey, series }) => {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {series.map((s) => (
            <Line key={s.dataKey} type="monotone" dataKey={s.dataKey} stroke={s.color} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


