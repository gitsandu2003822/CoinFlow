import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import SummaryCard from '../../components/SummaryCard';
import TransactionList from '../../components/TransactionList';
import { useTransactions } from '../../hooks/useTransaction';

const HomeScreen: React.FC = () => {
  const { transactions, loading, deleteTransaction, refreshTransactions } = useTransactions();

  const recentTransactions = transactions.slice(0, 10);

  return (
    <View className="flex-1 bg-slate-950">
      <ScrollView 
        className="flex-1 px-4 pt-4"
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshTransactions} />
        }
      >
        <View className="mb-5 rounded-3xl bg-white/10 px-5 py-5">
          <Text className="text-xs font-semibold uppercase tracking-[2px] text-sky-200">CoinFlow</Text>
          <Text className="mt-1 text-3xl font-bold text-white">Finance Dashboard</Text>
          <Text className="mt-2 text-sm leading-5 text-slate-300">
            A cleaner view of your income, expenses, and current balance.
          </Text>
        </View>
        
        <SummaryCard transactions={transactions} />
        
        <Text className="mb-3 text-lg font-semibold text-white">Recent Transactions</Text>
        <TransactionList
          transactions={recentTransactions}
          onDelete={deleteTransaction}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;