import { Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export default function RepositoryScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Buku');
  const [searchFocused, setSearchFocused] = useState(false);

  const categories = ['Buku', 'Buletin', 'Jurnal', 'Infografis'];
  
  const collections = [
    { id: 1, title: 'Panduan Budidaya Hidroponik Modern', type: 'BUKU', year: '2024', author: 'Dr. Ahmad Santoso' },
    { id: 2, title: 'Teknologi Pertanian Berkelanjutan', type: 'JURNAL', year: '2024', author: 'Prof. Sri Rahayu' },
    { id: 3, title: 'Inovasi Pupuk Organik Nusantara', type: 'BULETIN', year: '2023', author: 'Tim Peneliti BPTP' },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-10 bg-gray-50`}>
        {/* Header with Gradient Effect */}
        <View style={tw`px-6 pt-12 pb-10 bg-emerald-800 rounded-b-[32px] shadow-lg`}>
          <View style={tw`flex-row justify-between items-start mb-6`}>
            <View style={tw`flex-1`}>
              <Text style={tw`text-white text-3xl font-extrabold tracking-tight`}>
                Repositori
              </Text>
              <Text style={tw`text-emerald-100 text-base mt-2 leading-5`}>
                Akses literatur digital pertanian terlengkap
              </Text>
            </View>
            <Pressable style={tw`bg-emerald-700/50 p-3 rounded-full`}>
              <Ionicons name="bookmark-outline" size={22} color="#fff" />
            </Pressable>
          </View>

          {/* Search Bar */}
          <View style={tw`flex-row items-center bg-white rounded-2xl px-4 py-1 shadow-md ${searchFocused ? 'border-2 border-emerald-500' : ''}`}>
            <Ionicons name="search-outline" size={22} color={searchFocused ? "#10b981" : "#64748b"} />
            <TextInput
              placeholder="Cari jurnal, buku, atau artikel..."
              placeholderTextColor="#94a3b8"
              style={tw`flex-1 ml-3 h-12 text-gray-800 text-base`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchFocused && (
              <Pressable>
                <Ionicons name="options-outline" size={20} color="#10b981" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={tw`px-6 mt-6`}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`-mx-1`}>
            {[
              { icon: 'book-outline', label: '1.2K Buku', color: 'bg-blue-50 border-blue-100' },
              { icon: 'document-text-outline', label: '850 Jurnal', color: 'bg-purple-50 border-purple-100' },
              { icon: 'newspaper-outline', label: '430 Buletin', color: 'bg-amber-50 border-amber-100' },
            ].map((stat, idx) => (
              <Pressable
                key={idx}
                style={tw`${stat.color} border px-5 py-3.5 rounded-xl mr-3 flex-row items-center`}
              >
                <Ionicons name={stat.icon} size={20} color="#059669" />
                <Text style={tw`text-slate-700 font-semibold ml-2 text-sm`}>{stat.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={tw`px-6 mt-8`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-xl font-bold text-slate-800`}>Kategori</Text>
            <Pressable style={tw`flex-row items-center`}>
              <Text style={tw`text-emerald-700 font-semibold text-sm`}>Lihat Semua</Text>
              <Ionicons name="chevron-forward" size={16} color="#059669" style={tw`ml-1`} />
            </Pressable>
          </View>

          <View style={tw`flex-row flex-wrap gap-3`}>
            {categories.map((item) => (
              <Pressable
                key={item}
                onPress={() => setSelectedCategory(item)}
                style={tw`${
                  selectedCategory === item 
                    ? 'bg-emerald-700 shadow-md' 
                    : 'bg-white border border-gray-200'
                } px-6 py-3 rounded-xl`}
              >
                <Text style={tw`${selectedCategory === item ? 'text-white' : 'text-slate-600'} font-semibold text-sm`}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={tw`px-6 mt-8`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-xl font-bold text-slate-800`}>
              Koleksi Terbaru
            </Text>
            <Pressable>
              <Ionicons name="funnel-outline" size={20} color="#64748b" />
            </Pressable>
          </View>

          {collections.map((item) => (
            <Pressable
              key={item.id}
              style={tw`flex-row bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 active:bg-gray-50`}
            >
              <View style={tw`w-18 h-24 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl items-center justify-center mr-4 shadow-sm`}>
                <Feather name="book-open" size={28} color="#065f46" />
              </View>

              <View style={tw`flex-1 justify-center pr-2`}>
                <Text style={tw`font-bold text-slate-800 text-base mb-2 leading-5`} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={tw`flex-row items-center mb-1.5`}>
                  <View style={tw`bg-emerald-50 px-2.5 py-1 rounded-md mr-2`}>
                    <Text style={tw`text-emerald-700 text-xs font-bold`}>
                      {item.type}
                    </Text>
                  </View>
                  <Text style={tw`text-slate-400 text-xs`}>
                    {item.year}
                  </Text>
                </View>
                <Text style={tw`text-slate-500 text-xs`} numberOfLines={1}>
                  {item.author}
                </Text>
              </View>
              
              <View style={tw`justify-center`}>
                <View style={tw`bg-emerald-50 p-2 rounded-full`}>
                  <Ionicons name="chevron-forward" size={18} color="#059669" />
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Load More Button */}
        <View style={tw`px-6 mt-4`}>
          <Pressable style={tw`bg-white border-2 border-emerald-700 rounded-xl py-3.5 items-center`}>
            <Text style={tw`text-emerald-700 font-bold text-base`}>Muat Lebih Banyak</Text> 
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}