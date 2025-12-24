import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import tw from 'twrnc';

const DetailBookScreen = () => {
  const router = useRouter();

  const BOOK_DETAIL = [
    { label: 'Judul', value: 'Penyuluhan pertanian / Yayasan Pengembangan Sinar Tani', isTitle: true },
    { label: 'Pengarang', value: 'YAYASAN PENGEMBANGAN SINAR TANI' },
    { label: 'Penerbit', value: 'Jakarta : Yayasan Pengembangan Sinar Tani, 2001' },
    { label: 'Deskripsi Fisik', value: 'viii, 516 p. : ill. ; 22 cm' },
    { label: 'Subjek', value: 'AGRICULTURE\nEXTENSION ACTIVITIES', isLink: true },
    { label: 'Catatan', value: 'Bibl.: p. 496-512' },
    { label: 'Bahasa', value: 'Indonesia' },
    { label: 'Bentuk Karya', value: 'Karya tulis semi populer' },
    { label: 'Target Pembaca', value: 'Umum' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Cari' | 'Browse'>('Cari');

  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={tw`px-6 pt-12 pb-10 bg-emerald-800 rounded-b-[32px] shadow-lg`}>
          
          {/* BACK BUTTON */}
          <Pressable
            onPress={() => router.replace('/')}
            style={tw`flex-row items-center mb-4`}
          >
            <Feather name="arrow-left" size={18} color="white" />
            <Text style={tw`text-white ml-2 font-semibold`}>
              Kembali ke Home
            </Text>
          </Pressable>

          <Text style={tw`text-white text-3xl mt-2 font-extrabold tracking-tight`}>
            OPAC
          </Text>
          <Text style={tw`text-emerald-100 text-lg leading-5`}>
            Perpustakaan Pertanian
          </Text>
        </View>

        {/* SEARCH */}
        <View style={tw`bg-white mt-6 mx-4 rounded-3xl p-5 shadow-xl border border-gray-100`}>
          
          {/* TAB */}
          <View style={tw`flex-row bg-gray-100 rounded-xl p-1 mb-4`}>
            {(['Cari', 'Browse'] as const).map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={tw`flex-1 py-2 rounded-lg ${activeTab === tab ? 'bg-white shadow-sm' : ''}`}
              >
                <Text
                  style={tw`text-center font-bold ${
                    activeTab === tab ? 'text-emerald-800' : 'text-gray-400'
                  }`}
                >
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* INPUT */}
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

          {/* ACTION */}
          <View style={tw`flex-row gap-2`}>
            <Pressable style={tw`flex-1 bg-gray-50 border border-gray-200 rounded-xl justify-center items-center py-3`}>
              <Text style={tw`text-xs text-gray-600 font-semibold`}>
                Semua Bahan ▾
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleSearch(searchQuery)}
              style={tw`flex-1 bg-emerald-600 rounded-xl justify-center items-center py-3 shadow-md`}
            >
              <Text style={tw`text-white font-bold`}>
                Cari Sekarang
              </Text>
            </Pressable>
          </View>
        </View>

        {/* DETAIL BUKU */}
        <View style={tw`p-4`}>
          <View style={tw`flex-row mt-5`}>
            
            <Image
              source={{
                uri: 'https://www.kikp-pertanian.id/pustaka/uploaded_files/sampul_koleksi/original/Monograf/4647.jpg',
              }}
              style={tw`w-32 h-48 bg-gray-200 rounded shadow-sm`}
              resizeMode="cover"
            />

            <View style={tw`flex-1 ml-4`}>
              {BOOK_DETAIL.map((item, index) => (
                <View
                  key={index}
                  style={tw`flex-row border-b border-gray-100 py-2`}
                >
                  <Text style={tw`w-24 text-gray-600 text-xs font-bold`}>
                    {item.label}
                  </Text>
                  <Text
                    style={tw`flex-1 text-xs ${
                      item.isTitle ? 'text-red-600 font-bold' : 'text-gray-800'
                    } ${item.isLink ? 'text-blue-600 underline' : ''}`}
                  >
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailBookScreen;
