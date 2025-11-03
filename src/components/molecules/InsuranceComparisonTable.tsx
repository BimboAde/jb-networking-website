import { Button } from '../atoms/Button';

type ComparisonRow = {
  label: string;
  values: string[]; // length should match headers-1
  emphasis?: boolean;
  isCta?: boolean;
};

type InsuranceComparisonTableProps = {
  headers: [string, string, string, string];
  rows: ComparisonRow[];
};

export const InsuranceComparisonTable = ({ headers, rows }: InsuranceComparisonTableProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-brand-green text-white">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className={`px-6 py-4 ${i === 0 ? 'text-left' : 'text-center'} font-semibold`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, idx) => {
              if (row.isCta) {
                return (
                  <tr key={idx}>
                    <td className="px-6 py-4" />
                    {row.values.map((val, i) => (
                      <td key={i} className="px-6 py-4 text-center">
                        <Button
                          variant={i === 1 ? 'primary' : 'primary'}
                          className={`${i === 1 ? 'bg-brand-gold hover:bg-yellow-600' : ''}`}
                        >
                          {val}
                        </Button>
                      </td>
                    ))}
                  </tr>
                );
              }

              return (
                <tr key={idx} className={`${row.emphasis ? 'bg-brand-gray' : 'hover:bg-brand-gray'}`}>
                  <td className={`px-6 py-4 font-${row.emphasis ? 'bold' : 'medium'} text-brand-green`}>{row.label}</td>
                  {row.values.map((val, i) => (
                    <td key={i} className={`px-6 py-4 text-center ${row.emphasis ? 'font-bold text-brand-green' : ''}`}>{val}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};


