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
    { id: 1, title: 'Panduan Budidaya Hidroponik Modern', type: 'BUKU', year: '2024', author: 'Dr. Ahmad Santoso', size: '4.2 MB', pages: 248 },
    { id: 2, title: 'Teknologi Pertanian Berkelanjutan', type: 'JURNAL', year: '2024', author: 'Prof. Sri Rahayu', size: '2.8 MB', pages: 156 },
    { id: 3, title: 'Inovasi Pupuk Organik Nusantara', type: 'BULETIN', year: '2023', author: 'Tim Peneliti BPTP', size: '1.5 MB', pages: 84 },
    { id: 4, title: 'Analisis Informasi menentukan konsep-konsep penting', type: 'ARTIKEL', year: '2022', author: 'Tim Peneliti BPTP', size: '5.0 MB', pages: 32 },
    { id: 5, title: 'Pengelolaan Hama Terpadu pada Tanaman Padi', type: 'BULETIN', year: '2022', author: 'Dr. Budi Hartono', size: '0.9 MB', pages: 48 },
  ];

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredCollections([]);
      return;
    }

    const filtered = collections.filter(item => 
      item.title.toLowerCase().includes(text.toLowerCase()) ||
      item.author.toLowerCase().includes(text.toLowerCase()) ||
      item.type.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCollections(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredCollections([]);
  };

  const displayedCollections = searchQuery.trim() !== '' ? filteredCollections : collections;

  const getTypeColor = (type) => {
    const colors = {
      'BUKU': { bg: 'bg-blue-50', text: 'text-blue-700', icon: '#2563eb' },
      'JURNAL': { bg: 'bg-purple-50', text: 'text-purple-700', icon: '#7c3aed' },
      'BULETIN': { bg: 'bg-amber-50', text: 'text-amber-700', icon: '#d97706' },
      'ARTIKEL': { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: '#059669' },
      'PDF': { bg: 'bg-slate-50', text: 'text-slate-700', icon: '#475569' }
    };
    return colors[type] || colors['PDF'];
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
        
        {/* Header */}
        <View style={tw`px-5 pt-6 pb-8 bg-emerald-800`}>
          <View style={tw`mb-6`}>
            <Text style={tw`text-slate-300 text-3xl font-bold tracking-tight mb-2`}>
              Kepustakawanan
            </Text>
            <Text style={tw`text-slate-200 text-base leading-6`}>
              {collections.length} dokumen literatur digital tersedia
            </Text>
          </View>

          {/* Search Bar */}
          <View style={tw`flex-row items-center bg-slate-50 rounded-2xl px-4 py-3.5 ${searchFocused ? 'bg-white border-2 border-slate-200' : 'border border-transparent'}`}>
            <Ionicons name="search-outline" size={20} color={searchFocused ? "#0f172a" : "#94a3b8"} />
            <TextInput
              placeholder="Cari berdasarkan judul, penulis, atau tipe..." 
              placeholderTextColor="#94a3b8" 
              style={tw`flex-1 ml-3 text-slate-900 text-base`}
              value={searchQuery}
              onChangeText={handleSearch}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchQuery.trim() !== '' && (
              <Pressable onPress={clearSearch} hitSlop={8}>
                <Ionicons name="close-circle" size={20} color="#64748b" />
              </Pressable>
            )}
          </View>

          {/* Search Results Info */}
          {searchQuery.trim() !== '' && (
            <Text style={tw`text-slate-500 text-sm mt-3 ml-1`}>
              {displayedCollections.length} hasil ditemukan
            </Text>
          )}
        </View>

        {/* Content Section */}
        <View style={tw`px-5`}>
          {displayedCollections.length === 0 && searchQuery.trim() !== '' ? (
            <View style={tw`items-center justify-center py-16`}>
              <View style={tw`w-20 h-20 bg-slate-100 rounded-full items-center justify-center mb-4`}>
                <Ionicons name="search-outline" size={36} color="#94a3b8" />
              </View>
              <Text style={tw`text-slate-900 text-lg font-semibold mb-2`}>
                Tidak ada hasil
              </Text>
              <Text style={tw`text-slate-500 text-sm text-center px-8`}>
                Coba kata kunci lain atau hapus filter pencarian
              </Text>
            </View>
          ) : (
            displayedCollections.map((item, index) => {
              const typeColor = getTypeColor(item.type);
              return (
                <Pressable
                  key={item.id}
                  style={({ pressed }) => [
                    tw`bg-white rounded-2xl p-4 mb-3 border border-slate-100`,
                    pressed && tw`bg-slate-50`,
                  ]}
                  onPress={() => console.log('Open document:', item.id)}
                >
                  <View style={tw`flex-row`}>
                    {/* Document Icon */}
                    <View style={tw`w-16 h-20 ${typeColor.bg} rounded-xl items-center justify-center mr-4`}>
                      <Ionicons name="document-text-outline" size={32} color={typeColor.icon} />
                    </View>

                    {/* Document Info */}
                    <View style={tw`flex-1`}>
                      {/* Type & Year */}
                      <View style={tw`flex-row items-center mb-2`}>
                        <View style={tw`${typeColor.bg} px-2.5 py-1 rounded-md mr-2`}>
                          <Text style={tw`${typeColor.text} text-xs font-semibold`}>{item.type}</Text>
                        </View>
                        <Text style={tw`text-slate-400 text-xs font-medium`}>{item.year}</Text>
                      </View>
                      
                      {/* Title */}
                      <Text style={tw`font-semibold text-slate-900 text-base mb-2 leading-6`} numberOfLines={2}>
                        {item.title}
                      </Text>
                      
                      {/* Author */}
                      <Text style={tw`text-slate-600 text-sm mb-3`} numberOfLines={1}>
                        {item.author}
                      </Text>
                      
                      {/* Meta Info */}
                      <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-row items-center gap-4`}>
                          <View style={tw`flex-row items-center`}>
                            <Ionicons name="document-outline" size={14} color="#94a3b8" />
                            <Text style={tw`text-slate-500 text-xs ml-1.5`}>{item.pages} hal</Text>
                          </View>
                          <View style={tw`flex-row items-center`}>
                            <Feather name="hard-drive" size={13} color="#94a3b8" />
                            <Text style={tw`text-slate-500 text-xs ml-1.5`}>{item.size}</Text>
                          </View>
                        </View>
                        
                        {/* Action Button */}
                        <View style={tw`bg-emerald-600 px-4 py-2 rounded-lg`}>
                          <Text style={tw`text-white text-xs font-semibold`}>Buka</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}