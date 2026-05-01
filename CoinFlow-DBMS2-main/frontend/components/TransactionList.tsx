import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../services/database';
import { formatCurrency, formatDate } from '../utils/helpers';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => Promise<void>;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const handleDelete = (transaction: Transaction) => {
    Alert.alert(
      'Delete Transaction',
      `Are you sure you want to delete "${transaction.desc}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(transaction.id!),
        },
      ]
    );
  };

  if (transactions.length === 0) {
    return (
      <View className="items-center rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-10">
        <View className="mb-4 h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <Ionicons name="document-text-outline" size={28} color="#64748B" />
        </View>
        <Text className="text-lg font-semibold text-slate-700">No transactions yet</Text>
        <Text className="mt-2 text-center text-slate-400">Add your first transaction to get started</Text>
      </View>
    );
  }

  return (
    <ScrollView className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70">
      {transactions.map((transaction) => (
        <View
          key={transaction.id}
          className="flex-row items-center justify-between border-b border-slate-100 px-4 py-4"
        >
          <View className={`mr-3 h-11 w-11 items-center justify-center rounded-2xl ${transaction.type === 'income' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
            <Ionicons
              name={transaction.type === 'income' ? 'arrow-up' : 'arrow-down'}
              size={18}
              color={transaction.type === 'income' ? '#059669' : '#E11D48'}
            />
          </View>
          
          <View className="flex-1">
            <Text className="text-base font-semibold text-slate-800">
              {transaction.desc}
            </Text>
            <Text className="mt-1 text-sm text-slate-500">
              {transaction.category} • {formatDate(transaction.date)}
            </Text>
            <View className="mt-2 flex-row items-center">
              {transaction.synced ? (
                <View className="flex-row items-center rounded-full bg-emerald-50 px-2.5 py-1">
                  <Ionicons name="checkmark-circle-outline" size={14} color="#059669" />
                  <Text className="ml-1 text-xs font-medium text-emerald-700">Synced with cloud</Text>
                </View>
              ) : (
                <View className="flex-row items-center rounded-full bg-amber-50 px-2.5 py-1">
                  <Ionicons name="alert-circle-outline" size={14} color="#D97706" />
                  <Text className="ml-1 text-xs font-medium text-amber-700">Local only</Text>
                </View>
              )}
            </View>
          </View>
          
          <View className="items-end">
            <Text
              className={`text-base font-bold ${
                transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </Text>
            <TouchableOpacity
              onPress={() => handleDelete(transaction)}
              className="mt-2 rounded-full bg-rose-50 px-3 py-2"
            >
              <Text className="text-xs font-semibold text-rose-600">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default TransactionList;