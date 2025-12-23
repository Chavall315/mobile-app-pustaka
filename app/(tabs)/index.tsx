import React, { useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const Header: React.FC = () => {
  return (
    <View style={tw`bg-emerald-800 pt-4 pb-8 px-6 rounded-b-[35px] shadow-lg`}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top']}>
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center`}>
            <View>
              <Text style={tw`text-yellow-400 text-3xl font-extrabold tracking-tight`}>OPAC</Text>
              <Text style={tw`text-emerald-100 text-base opacity-80 uppercase`}>
                Perpustakaan Pertanian
              </Text>
            </View>
          </View>
          <View style={tw`flex-row bg-emerald-900/50 rounded-full px-2 py-1`}>
            <Pressable style={tw`px-3 py-1`}><Text style={tw`text-white text-xs font-bold`}>Login</Text></Pressable>
            <View style={tw`w-[1px] h-3 bg-white/20 self-center`} />
            <Pressable style={tw`px-3 py-1`}><Text style={tw`text-white text-xs font-bold`}>Daftar</Text></Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const SearchSection: React.FC<{ onSearch: (q: string) => void }> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Cari' | 'Browse'>('Cari');

  return (
    
    <View style={tw`px-6 -mt-6`}>
      <SafeAreaView>
        <View style={tw`bg-white rounded-3xl p-5 shadow-xl border border-gray-100`}>
          {/* Tab Switcher */}
          <View style={tw`flex-row bg-gray-100 rounded-xl p-1 mb-4`}>
            {['Cari', 'Browse'].map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab as any)}
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
            />
          </View>

          {/* Filters and Action */}
          <View style={tw`flex-row gap-2`}>
            <Pressable style={tw`flex-1 bg-gray-50 border border-gray-200 rounded-xl justify-center items-center py-3`}>
              <Text style={tw`text-xs text-gray-600 font-semibold`}>Semua Bahan ▾</Text>
            </Pressable>
            <Pressable 
              onPress={() => onSearch(searchQuery)}
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
      </SafeAreaView>
    </View>
    
  );
};

const BookCard = ({ item, isPlaceholder }) => (
  <Pressable style={tw`w-40 mr-5`}>
    <View style={tw`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden`}>
      {isPlaceholder ? (
        <View style={tw`h-56 bg-gray-100 items-center justify-center p-4`}>
          <Text style={tw`text-gray-300 text-[10px] font-bold text-center tracking-widest leading-4`}>
            COVER{'\n'}NOT{'\n'}AVAILABLE
          </Text>
        </View>
      ) : (
        <Image 
          source={{ uri: item.coverUrl }}
          style={tw`h-56 w-full`}
          resizeMode="cover"
        />
      )}
      <View style={tw`absolute top-2 left-2 bg-emerald-600/90 px-2 py-0.5 rounded-md`}>
        <Text style={tw`text-[8px] text-white font-bold uppercase`}>Buku</Text>
      </View>
    </View>
    <Text style={tw`mt-3 text-xs font-bold text-gray-800 leading-4`} numberOfLines={2}>
      {item.title}
    </Text>
    <Text style={tw`mt-1 text-[10px] text-gray-400 font-medium`}>Tersedia</Text>
  </Pressable>
);

const CollectionSection: React.FC<{ title: string; books: any[]; isPlaceholder?: boolean }> = ({ title, books, isPlaceholder }) => (
  <View style={tw`mb-10`}>
    <View style={tw`flex-row justify-between items-end px-6 mb-4`}>
      <View>
        <View style={tw`w-8 h-1 bg-yellow-400 mb-1 rounded-full`} />
        <Text style={tw`text-lg font-extrabold text-gray-900 tracking-tight`}>{title}</Text>
      </View>
      <Pressable>
        <Text style={tw`text-emerald-700 font-bold text-xs`}>Lihat Semua →</Text>
      </Pressable>
    </View>

    <FlatList
      data={books}
      horizontal
      contentContainerStyle={tw`pl-6 pr-1`}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <BookCard item={item} isPlaceholder={isPlaceholder} />}
    />
  </View>
);

export default function OPACScreen() {
  // ... (Data featuredBooks dan recentBooks tetap sama)
  const featuredBooks = [
    { title: 'Penyuluhan pertanian / Mayasari Pengembangan Sinar Tani', coverUrl: 'https://www.kikp-pertanian.id/pustaka/uploaded_files/sampul_koleksi/original/Monograf/4647.jpg' },
    { title: 'Dinamika penyuluhan pertanian / Leta Rafael Levis', coverUrl: 'https://www.kikp-pertanian.id/pustaka/uploaded_files/sampul_koleksi/original/Monograf/63496.jpg' },
    { title: 'Optimalisasi lahan rawa: akselerasi menuju lumbung pangan dunia 2045', coverUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747e' },
  ];

  const recentBooks = [
    { title: 'Hama dan penyakit pada tanaman kentang', isPlaceholder: true },
    { title: 'Proceedings seminar sistem pengurusan hutan alam', isPlaceholder: true },
    { title: 'Simposium pemanfaatan tempe dalam kesehatan', isPlaceholder: true },
  ];

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-10`}>
        <Header />
        <SearchSection onSearch={(q) => console.log(q)} />
        
        <View style={tw`mt-10`}>
          <CollectionSection title="Koleksi Unggulan" books={featuredBooks} isPlaceholder={false} />
          <CollectionSection title="Buku Terbaru" books={recentBooks} isPlaceholder={true} />
        </View>
      </ScrollView>
    </View>
  );
}