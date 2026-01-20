import { Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export default function RepositoryScreen() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCollections, setFilteredCollections] = useState([]);
  
  const collections = [
    { id: 1, title: 'Panduan Budidaya Hidroponik Modern', type: 'BUKU', year: '2024', author: 'Dr. Ahmad Santoso', size: '4.2 MB' },
    { id: 2, title: 'Teknologi Pertanian Berkelanjutan', type: 'JURNAL', year: '2024', author: 'Prof. Sri Rahayu', size: '2.8 MB' },
    { id: 3, title: 'Inovasi Pupuk Organik Nusantara', type: 'BULETIN', year: '2023', author: 'Tim Peneliti BPTP', size: '1.5 MB' },
    { id: 4, title: 'Analisis Informasi menentukan konsep-konsep penting', type: 'PDF', year: '2022', author: 'Tim Peneliti BPTP', size: '5.0 MB' },
    { id: 5, title: 'Pengelolaan Mikrofis', type: 'BULETIN', year: '2022', author: 'Tim Peneliti BPTP', size: '0.9 MB' },
  ];

const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredCollections([]);
      return;
    }

    const filtered = collections.filter(item => 
      item.title.toLowerCase().includes(text.toLowerCase()) ||
      item.author.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCollections(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredCollections([]);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-10 bg-gray-50`}>
        
        <View style={tw`px-6 pt-12 pb-10 bg-emerald-800 rounded-b-[32px] shadow-lg`}>
          <View style={tw`flex-row justify-between items-start mb-6`}>
            <View style={tw`flex-1`}>
              <Text style={tw`text-white text-3xl font-extrabold tracking-tight`}>
                Kepustakawanan
              </Text>
              <Text style={tw`text-emerald-100 text-base mt-2 leading-5`}>
                Akses literatur digital pertanian terlengkap
              </Text>
            </View>
          </View>

          <View style={tw`flex-row items-center bg-white rounded-2xl px-4 py-1 shadow-md ${searchFocused ? 'border-2 border-emerald-500' : ''}`}>
            <Ionicons name="search-outline" size={22} color={searchFocused ? "#10b981" : "#64748b"} />
            <TextInput
              placeholder="Cari jurnal, buku, atau artikel..." 
              placeholderTextColor="#94a3b8" 
              style={tw`flex-1 ml-3 h-12 text-gray-800 text-base`}
              value={searchQuery}
              onChangeText={handleSearch}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchQuery.trim() !== '' && (
              <Pressable onPress={clearSearch} style={tw`mr-2`}>
                <Ionicons name="close-circle" size={20} color="#64748b" />
              </Pressable>
            )}
            {searchFocused && (
              <Pressable>
                <Ionicons name="options-outline" size={20} color="#10b981" />
              </Pressable>
            )}
          </View>
        </View>

        {/* CONTENT SECTION */}
        <View style={tw`px-6 mt-10`}>
          {collections.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                tw`flex-row bg-white rounded-3xl p-4 mb-4 shadow-xl shadow-gray-200 border border-gray-100`,
                pressed && tw`bg-gray-50 scale-98`,
              ]}
            >
              {/* PDF Icon / Thumbnail */}
              <View style={tw`w-20 h-26 bg-emerald-50 rounded-2xl items-center justify-center mr-4 border border-emerald-100`}>
                <View style={tw`absolute top-2 right-2`}>
                   <View style={tw`w-2 h-2 rounded-full bg-emerald-400`} />
                </View>
                <Ionicons name="document-text" size={40} color="#059669" />
                <View style={tw`bg-emerald-600 px-2 py-0.5 rounded-md mt-2`}>
                   <Text style={tw`text-white text-[8px] font-black italic`}>PDF</Text>
                </View>
              </View>

              {/* Document Info */}
              <View style={tw`flex-1 justify-between py-1`}>
                <View>
                  <View style={tw`flex-row justify-between items-start`}>
                    <View style={tw`bg-emerald-100 px-2 py-1 rounded-lg mb-2`}>
                      <Text style={tw`text-emerald-700 text-[9px] font-black uppercase tracking-widest`}> 
                        {item.type}
                      </Text>
                    </View>
                    <Text style={tw`text-slate-300 text-[10px] font-bold`}>{item.year}</Text>
                  </View>
                  
                  <Text style={tw`font-bold text-slate-800 text-sm mb-1 leading-5`} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={tw`text-slate-400 text-[11px] font-medium`} numberOfLines={1}>
                    {item.author}
                  </Text>
                </View>
                
                <View style={tw`flex-row justify-between items-center`}>
                   <View style={tw`flex-row items-center`}>
                      <Feather name="download-cloud" size={12} color="#94a3b8" />
                      <Text style={tw`text-slate-400 text-[10px] ml-1 font-bold uppercase`}>{item.size}</Text>
                   </View>
                   <View style={tw`bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100`}>
                      <Text style={tw`text-emerald-600 text-[10px] font-bold`}>Buka File</Text>
                   </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}