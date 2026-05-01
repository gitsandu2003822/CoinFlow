import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { calculateSummary, formatCurrency } from '../utils/helpers';

interface SummaryCardProps {
  transactions: any[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ transactions }) => {
  const { income, expenses, balance } = calculateSummary(transactions);
  const balancePositive = balance >= 0;

  return (
    <View className="mb-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70">
      <View className="bg-slate-900 px-5 py-4">
        <View className="mb-2 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
              <Ionicons name="pie-chart-outline" size={20} color="#FFFFFF" />
            </View>
            <View>
              <Text className="text-xs font-semibold uppercase tracking-[2px] text-sky-200">Overview</Text>
              <Text className="text-xl font-bold text-white">Financial Summary</Text>
            </View>
          </View>
          <View className="rounded-full bg-white/10 px-3 py-1">
            <Text className="text-xs font-semibold text-white/90">Live</Text>
          </View>
        </View>
        <Text className="text-sm leading-5 text-slate-300">
          A quick snapshot of your money flow, balance, and spending habits.
        </Text>
      </View>

      <View className="flex-row px-4 py-5">
        <View className="flex-1 rounded-2xl bg-emerald-50 px-3 py-4">
          <View className="mb-2 h-9 w-9 items-center justify-center rounded-2xl bg-emerald-100">
            <Ionicons name="trending-up-outline" size={18} color="#059669" />
          </View>
          <Text className="text-xs font-medium uppercase tracking-wide text-emerald-700">Income</Text>
          <Text className="mt-1 text-base font-extrabold text-emerald-800">{formatCurrency(income)}</Text>
        </View>

        <View className="mx-3 flex-1 rounded-2xl bg-rose-50 px-3 py-4">
          <View className="mb-2 h-9 w-9 items-center justify-center rounded-2xl bg-rose-100">
            <Ionicons name="trending-down-outline" size={18} color="#E11D48" />
          </View>
          <Text className="text-xs font-medium uppercase tracking-wide text-rose-700">Expenses</Text>
          <Text className="mt-1 text-base font-extrabold text-rose-800">{formatCurrency(expenses)}</Text>
        </View>

        <View className={`flex-1 rounded-2xl px-3 py-4 ${balancePositive ? 'bg-blue-50' : 'bg-amber-50'}`}>
          <View className={`mb-2 h-9 w-9 items-center justify-center rounded-2xl ${balancePositive ? 'bg-blue-100' : 'bg-amber-100'}`}>
            <Ionicons
              name={balancePositive ? 'wallet-outline' : 'alert-circle-outline'}
              size={18}
              color={balancePositive ? '#2563EB' : '#D97706'}
            />
          </View>
          <Text className={`text-xs font-medium uppercase tracking-wide ${balancePositive ? 'text-blue-700' : 'text-amber-700'}`}>
            Balance
          </Text>
          <Text className={`mt-1 text-base font-extrabold ${balancePositive ? 'text-blue-800' : 'text-amber-800'}`}>
            {formatCurrency(balance)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SummaryCard;