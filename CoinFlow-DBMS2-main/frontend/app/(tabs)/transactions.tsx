import React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTransactions } from '../../hooks/useTransaction';
import TransactionForm from '../../components/TransactionForm';
import TransactionList from '../../components/TransactionList';

const TransactionScreen: React.FC = () => {
  const { 
    transactions, 
    loading, 
    addTransaction, 
    deleteTransaction, 
    refreshTransactions,
    syncPendingTransactions,
    backendAvailable 
  } = useTransactions();

  const handleSync = async () => {
    await syncPendingTransactions();
  };

  return (
    <View className="flex-1 bg-slate-950">
      <ScrollView 
        className="flex-1 px-4 pt-4"
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshTransactions} />
        }
      >
        {/* Sync Button */}
        <TouchableOpacity
          onPress={handleSync}
          className="mb-4 flex-row items-center justify-center rounded-2xl bg-emerald-500 px-4 py-4 shadow-lg shadow-emerald-500/30"
        >
          <Ionicons name="sync-outline" size={18} color="#FFFFFF" />
          <Text className="ml-2 text-center text-base font-semibold text-white">
            Sync Pending Transactions
          </Text>
        </TouchableOpacity>

        <TransactionForm 
          onSubmit={addTransaction} 
          backendAvailable={backendAvailable} 
        />
        
        <View className="mt-6">
          <Text className="mb-3 text-lg font-semibold text-white">All Transactions</Text>
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TransactionScreen;