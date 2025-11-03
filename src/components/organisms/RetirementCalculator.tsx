'use client';

import { useMemo, useState } from 'react';
import { Heading } from '../atoms/Heading';

type RetirementCalculatorStrings = {
  title: string;
  description: string;
  inputsTitle: string;
  resultsTitle: string;
  currentAge: string;
  retirementAge: string;
  currentSavings: string;
  monthlyContribution: string;
  annualReturn: string;
  projectedSavings: string;
  yearsToRetirement: string;
  totalContributions: string;
  monthlyIncomeTitle: string;
  withdrawalRule: string;
  breakdownTitle: string;
  principal: string;
  growth: string;
  ctaSchedule: string;
};

export const RetirementCalculator = ({ strings }: { strings: RetirementCalculatorStrings }) => {
  const [currentAge, setCurrentAge] = useState<number>(35);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualReturn, setAnnualReturn] = useState<number>(7);

  const result = useMemo(() => {
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyReturn = (annualReturn / 100) / 12;
    const futureValueCurrent = currentSavings * Math.pow(1 + (annualReturn / 100), yearsToRetirement);
    const futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / (monthlyReturn || 1));
    const totalSavings = futureValueCurrent + futureValueContributions;
    const totalContributions = currentSavings + (monthlyContribution * monthsToRetirement);
    const growthAmount = totalSavings - totalContributions;
    const monthlyIncome = totalSavings * 0.04 / 12;
    return { yearsToRetirement, totalSavings, totalContributions, growthAmount, monthlyIncome };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn]);

  const formatCurrency = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{strings.title}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{strings.description}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <Heading level={3} className="text-brand-green mb-6">{strings.inputsTitle}</Heading>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{strings.currentAge}</label>
                <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{strings.retirementAge}</label>
                <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{strings.currentSavings}</label>
                <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{strings.monthlyContribution}</label>
                <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{strings.annualReturn}</label>
                <input type="number" value={annualReturn} step="0.1" onChange={(e) => setAnnualReturn(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <Heading level={3} className="text-brand-green mb-6">{strings.resultsTitle}</Heading>
            <div className="space-y-6">
              <div className="bg-brand-gray p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-brand-green mb-2">{formatCurrency(result.totalSavings)}</div>
                <div className="text-gray-600">{strings.projectedSavings}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-gray p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-brand-green">{result.yearsToRetirement}</div>
                  <div className="text-sm text-gray-600">{strings.yearsToRetirement}</div>
                </div>
                <div className="bg-brand-gray p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-brand-green">{formatCurrency(result.totalContributions)}</div>
                  <div className="text-sm text-gray-600">{strings.totalContributions}</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-brand-green to-brand-light-green p-6 rounded-lg text-white">
                <h4 className="text-lg font-bold mb-2">{strings.monthlyIncomeTitle}</h4>
                <div className="text-3xl font-bold text-brand-gold">{formatCurrency(result.monthlyIncome)}</div>
                <div className="text-green-100 text-sm">{strings.withdrawalRule}</div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-brand-green">{strings.breakdownTitle}</h4>
                <div className="flex justify-between">
                  <span className="text-gray-600">{strings.principal}</span>
                  <span className="font-semibold">{formatCurrency(result.totalContributions)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{strings.growth}</span>
                  <span className="font-semibold text-brand-green">{formatCurrency(result.growthAmount)}</span>
                </div>
              </div>
              <button className="w-full bg-brand-gold text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                {strings.ctaSchedule}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


