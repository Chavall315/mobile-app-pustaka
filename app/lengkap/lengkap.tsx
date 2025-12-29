import { collections } from '@/data/collections';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'twrnc';

export default function LengkapScreen() {
  const [showAbstract, setShowAbstract] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = collections.find(c => c.id === Number(id));

  if (!item) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center`}>
        <Text>Data tidak ditemukan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 pt-12 pb-4 border-b border-gray-200`}>
        <Pressable onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={tw`text-lg font-semibold flex-1`} numberOfLines={1}>
          Detail Publikasi
        </Text>
      </View>

      <ScrollView contentContainerStyle={tw`pb-10`}>
        {/* Cover */}
        <View style={tw`items-center mt-6`}>
          <Image
            source={item.image}
            style={tw`w-40 h-56 rounded-xl`}
            resizeMode="cover"
          />
        </View>

        {/* Title */}
        <View style={tw`px-6 mt-6`}>
          <Text style={tw`text-xl font-bold`}>{item.title}</Text>
          <Text style={tw`text-slate-400 mt-1`}>Tahun {item.year}</Text>
        </View>

        {/* Abstract */}
        <View style={tw`px-6 mt-8`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Abstract</Text>
          <Text numberOfLines={showAbstract ? undefined : 4}>
            {item.abstract}
          </Text>

          {item.abstract?.length > 200 && (
            <Pressable onPress={() => setShowAbstract(!showAbstract)}>
              <Text style={tw`text-emerald-600 mt-2`}>
                {showAbstract ? 'Tutup' : 'Baca Selengkapnya'}
              </Text>
            </Pressable>
          )}
        </View>

        <View style={tw`px-6 mt-8`}>
            <Text style={tw`text-lg font-semibold mb-3`}>
                Informasi Publikasi
            </Text>

            <MetaRow label="Authors" value={item.author} />
            <MetaRow label="Publisher" value={item.publisher} />
            <MetaRow label="Collection" value="Lingkungan Pertanian" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-slate-400 text-sm mb-1`}>
        {label}
      </Text>
      <Text style={tw`text-slate-700 leading-6 whitespace-pre-line`}>
        {value}
      </Text>
    </View>
  );
}