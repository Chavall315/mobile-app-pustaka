import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import tw from 'twrnc';

const DetailBookScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Cari' | 'Browse'>('Cari');

  const BOOK_DETAIL = [
    { label: 'Pengarang', value: 'YAYASAN PENGEMBANGAN SINAR TANI', icon: 'user' },
    { label: 'Penerbit', value: 'Jakarta : Yayasan Pengembangan Sinar Tani, 2001', icon: 'book-open' },
    { label: 'Deskripsi Fisik', value: 'viii, 516 p. : ill. ; 22 cm', icon: 'layers' },
    { label: 'Subjek', value: 'AGRICULTURE, EXTENSION ACTIVITIES', isLink: true, icon: 'tag' },
    { label: 'Bahasa', value: 'Indonesia', icon: 'globe' },
    { label: 'Target Pembaca', value: 'Umum', icon: 'users' },
  ];

   const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={tw`bg-emerald-800 rounded-b-[35px] shadow-lg`}>
          <StatusBar barStyle="light-content" />
          <View style={tw`pt-4 pb-8 mt-7 px-6`}>
            <View style={tw`flex-row justify-between mt-10 items-center`}>
              <View>
                <Text style={tw`text-white text-3xl font-extrabold tracking-tight`}>OPAC</Text>
                <Text style={tw`text-emerald-100 text-base opacity-80 uppercase`}>
                  Perpustakaan Pertanian
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Search Section */}
        <View style={tw`bg-white mt-6 rounded-3xl p-5 shadow-xl border border-gray-100`}>
          {/* Tab Switcher */}
          <View style={tw`flex-row bg-gray-100 rounded-xl p-1 mb-4`}>
            {(['Cari', 'Browse'] as const).map((tab) => (
                <Pressable
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={tw`flex-1 py-2 rounded-lg ${activeTab === tab ? 'bg-white shadow-sm' : ''}`}
                >
                  <Text style={tw`text-center font-bold ${activeTab === tab ? 'text-emerald-800' : 'text-gray-400'}`}>
                    {tab}
                  </Text>
                </Pressable>
            ))}
          </View>

          {/* Input Field */}
          <View style={tw`flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-1 mb-3`}>
            <Text style={tw`text-lg mr-2`}>🔍</Text>
            <TextInput
              placeholder="Cari judul, pengarang..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={tw`flex-1 h-12 text-gray-800`}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Filters and Action */}
          <View style={tw`flex-row gap-2`}>
            <Pressable style={tw`flex-1 bg-gray-50 border border-gray-200 rounded-xl justify-center items-center py-3`}>
              <Text style={tw`text-xs text-gray-600 font-semibold`}>Semua Bahan ▾</Text>
            </Pressable>
            <Pressable 
              onPress={() => handleSearch(searchQuery)}
              style={tw`flex-1 bg-emerald-600 rounded-xl justify-center items-center py-3 shadow-md`}
            >
              <Text style={tw`text-white font-bold`}>Cari Sekarang</Text>
            </Pressable>
          </View>

          <View style={tw`flex-row justify-center gap-4 mt-4`}>
            <Text style={tw`text-[11px] text-emerald-700 font-medium`}>Pencarian Lanjut</Text>
            <Text style={tw`text-[11px] text-gray-300`}>|</Text>
            <Text style={tw`text-[11px] text-emerald-700 font-medium`}>Bantuan</Text>
          </View>
        </View>

        {/* BOOK HERO SECTION */}
        <View style={tw`px-6 mt-8 flex-row`}>
          <View style={tw`shadow-2xl`}>
            <Image
              source={{ uri: 'https://www.kikp-pertanian.id/pustaka/uploaded_files/sampul_koleksi/original/Monograf/4647.jpg' }}
              style={tw`w-36 h-52 rounded-2xl bg-gray-200`}
              resizeMode="cover"
            />
          </View>
          <View style={tw`flex-1 ml-5 justify-center`}>
            <View style={tw`bg-emerald-100 self-start px-2 py-1 rounded-md mb-2`}>
              <Text style={tw`text-emerald-700 text-[10px] font-bold uppercase`}>Monograf</Text>
            </View>
            <Text style={tw`text-xl font-black text-gray-900 leading-6 mb-2`}>
              Penyuluhan Pertanian
            </Text>
            <Text style={tw`text-gray-500 text-xs leading-4 font-medium italic`}>
              Yayasan Pengembangan Sinar Tani
            </Text>
            <View style={tw`flex-row items-center mt-4`}>
                <View style={tw`bg-emerald-500 w-3 h-3 rounded-full mr-2`} />
                <Text style={tw`text-emerald-700 font-bold text-xs`}>Tersedia untuk dipinjam</Text>
            </View>
          </View>
        </View>

        {/* INFORMATION SHEET */}
        <View style={tw`px-6 mt-10`}>
          <View style={tw`bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 mb-10`}>
            <Text style={tw`text-lg font-bold text-gray-900 mb-4 tracking-tight`}>Detail Informasi</Text>
            
            {BOOK_DETAIL.map((item, index) => (
              <View key={index} style={tw`flex-row mb-5`}>
                <View style={tw`w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4`}>
                  <Feather name={item.icon as any} size={16} color="#059669" />
                </View>
                <View style={tw`flex-1 border-b border-gray-50 pb-2`}>
                  <Text style={tw`text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1`}>
                    {item.label}
                  </Text>
                  <Text style={tw`text-gray-800 text-sm font-medium leading-5 ${item.isLink ? 'text-blue-600 underline' : ''}`}>
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}

            {/* ADDITIONAL NOTE SECTION */}
            <View style={tw`bg-emerald-50 p-4 rounded-2xl mt-2`}>
                <Text style={tw`text-emerald-800 text-xs font-bold mb-1`}>Catatan Bibliografi:</Text>
                <Text style={tw`text-emerald-600 text-xs leading-4`}>Bibl.: p. 496-512. Indeks: p. 513-516.</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailBookScreen;