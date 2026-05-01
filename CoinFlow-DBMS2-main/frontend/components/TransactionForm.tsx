import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../services/database';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  backendAvailable?: boolean;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, backendAvailable = true }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
    expense: ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'],
  };

  const handleSubmit = async () => {
    if (!amount || !description || !category) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const transactionData: Omit<Transaction, 'id'> = {
      amount: parseFloat(amount),
      desc: description,
      type,
      category,
      date: new Date().toISOString(),
    };

    setLoading(true);
    try {
      await onSubmit(transactionData);
      setAmount('');
      setDescription('');
      setCategory('');
      // Success alert is now handled in the hook with backend sync
    } catch (error) {
      Alert.alert('Error', 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70">
      <View className="bg-slate-900 px-5 py-4">
        <Text className="text-xs font-semibold uppercase tracking-[2px] text-sky-200">Transaction Entry</Text>
        <Text className="mt-1 text-xl font-bold text-white">Add New Transaction</Text>
        <Text className="mt-2 text-sm leading-5 text-slate-300">
          Keep your income and expenses organized in one place.
        </Text>
      </View>

      <View className="px-4 py-5">
        {/* Backend Status Indicator */}
        {backendAvailable && (
          <View className="mb-4 flex-row rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-2xl bg-sky-100">
              <Ionicons name="cloud-done-outline" size={20} color="#0284C7" />
            </View>
            <Text className="flex-1 text-sm leading-5 text-sky-900">
              Transactions will be saved locally and synchronized with cloud storage.
            </Text>
          </View>
        )}

        {!backendAvailable && (
          <View className="mb-4 flex-row rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-2xl bg-amber-100">
              <Ionicons name="cloud-offline-outline" size={20} color="#D97706" />
            </View>
            <Text className="flex-1 text-sm leading-5 text-amber-900">
              Cloud storage is unavailable. Transactions will be saved locally only.
            </Text>
          </View>
        )}

        {/* Type Selection */}
        <View className="mb-4 flex-row rounded-2xl bg-slate-100 p-1">
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center rounded-2xl py-3 ${
              type === 'expense' ? 'bg-rose-500 shadow-sm' : 'bg-transparent'
            }`}
            onPress={() => setType('expense')}
          >
            <Ionicons name="remove-circle-outline" size={16} color={type === 'expense' ? '#FFFFFF' : '#64748B'} />
            <Text className={`ml-2 font-semibold ${type === 'expense' ? 'text-white' : 'text-slate-600'}`}>
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center rounded-2xl py-3 ${
              type === 'income' ? 'bg-emerald-500 shadow-sm' : 'bg-transparent'
            }`}
            onPress={() => setType('income')}
          >
            <Ionicons name="add-circle-outline" size={16} color={type === 'income' ? '#FFFFFF' : '#64748B'} />
            <Text className={`ml-2 font-semibold ${type === 'income' ? 'text-white' : 'text-slate-600'}`}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount */}
        <Text className="mb-2 text-xs font-semibold uppercase tracking-[1.5px] text-slate-500">Amount</Text>
        <TextInput
          className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
          placeholder="Amount"
          placeholderTextColor="#94A3B8"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        {/* Description */}
        <Text className="mb-2 text-xs font-semibold uppercase tracking-[1.5px] text-slate-500">Description</Text>
        <TextInput
          className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900"
          placeholder="Description"
          placeholderTextColor="#94A3B8"
          value={description}
          onChangeText={setDescription}
        />

        {/* Category */}
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-xs font-semibold uppercase tracking-[1.5px] text-slate-500">Category</Text>
          <Text className="text-xs text-slate-400">Choose one</Text>
        </View>
        <View className="mb-4 flex-row flex-wrap">
          {categories[type].map((cat) => (
            <TouchableOpacity
              key={cat}
              className={`mr-2 mb-2 rounded-full px-4 py-2 ${
                category === cat ? 'bg-slate-900' : 'bg-slate-100'
              }`}
              onPress={() => setCategory(cat)}
            >
              <Text className={`font-medium ${category === cat ? 'text-white' : 'text-slate-700'}`}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className={`flex-row items-center justify-center rounded-2xl bg-slate-900 px-4 py-4 ${
            loading ? 'opacity-50' : ''
          }`}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Ionicons name="sparkles-outline" size={18} color="#FFFFFF" />
          <Text className="ml-2 text-center text-base font-semibold text-white">
            {loading ? 'Adding...' : 'Add Transaction'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TransactionForm;