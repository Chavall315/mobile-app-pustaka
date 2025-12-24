import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export default function RepositoryScreen() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCollections, setFilteredCollections] = useState([]);

  const categories = [
    'Buku', 
    'Buletin', 
    'Bunga Rampai', 
    'Informasi dan Teknologi', 
    'Jurnal', 
    'Majalah', 
    'Modul atau Laporan Pendidikan dan Pelatihan Pertanian', 
    'Prosiding', 
    'Warta'
  ];
  
  const collections = [
    { 
      id: 1, 
      title: 'Bank Pengetahuan Padi Indonesia', 
      author: 'Balai Penelitian Tanaman Kacang-kacangan dan Umbi-umbian',
      year: '2008',
      image: require('../../assets/images/cover1.jpg')
    },
    { 
      id: 2, 
      title: 'Pengelolaan Spesipik lokasi Tanaman Jagung', 
      author: 'Badan Penelitian dan Pengembangan Pertanian',
      year: '2008',
      image: require('../../assets/images/cover2.jpg')
    },
    { 
      id: 3, 
      title: 'Petunjuk Teknis Pengendalian Terpadu Penyakit Tungro', 
      author: 'Pusat Penelitian dan Pengembangan Tanaman Pangan',
      year: '2007',
      image: require('../../assets/images/cover3.jpg')
    },
    { 
      id: 4, 
      title: 'Petunjuk Teknis Pengendalian Terpadu Penyakit Tungro', 
      author: 'Pusat Penelitian dan Pengembangan Tanaman Pangan',
      year: '2007',
      image: require('../../assets/images/cover3.jpg')
    },
    { 
      id: 5, 
      title: 'Petunjuk Teknis Pengelolaan Sistem Usahatani di Lahan Pasang Surut', 
      author: 'Pusat Penelitian dan Pengembangan Tanaman Pangan',
      year: '1993',
      image: require('../../assets/images/cover5.jpg')
    },
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

  const displayCollections = searchQuery.trim() !== '' ? filteredCollections : collections;

  const handleCategoryPress = (category: string) => {
    console.log('Navigating to category:', category);
  };

  
  const handleItemPress = (item: any) => {
    console.log('Navigating to:', item.title);
  };

  
  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleLoadMore = () => {
    console.log('Load more pressed');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-10 bg-gray-50`}>
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

        <View style={tw`mt-8`}>
          <View style={tw`mb-4 px-6`}>
            <Text style={tw`text-xl font-bold text-slate-800`}>
              Communities in Repositori
            </Text>
            <Text style={tw`text-sm font-semibold text-gray-500`}>
              Select a community to browse its collections.
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-6 gap-3`}>
            {categories.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleCategoryPress(item)}
                style={tw`bg-white border border-gray-200 px-6 py-3 rounded-xl active:bg-emerald-50 active:border-emerald-300`}
              >
                <Text style={tw`text-slate-600 font-semibold text-sm`}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={tw`px-6 mt-8 mb-6`}>
          <View style={tw`flex-row justify-between items-center mb-5`}>
            <View>
              <Text style={tw`text-2xl font-bold text-slate-800`}>
                {searchQuery.trim() !== '' ? 'Search Results' : 'Recent Submissions'}
              </Text>
              <Text style={tw`text-sm text-slate-500 mt-1`}>
                {displayCollections.length} publikasi {searchQuery.trim() !== '' ? 'ditemukan' : 'terbaru'}
              </Text>
            </View>
            <Pressable 
              onPress={handleFilterPress}
              style={tw`bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-row items-center shadow-sm active:bg-gray-100`}
            >
              <Ionicons name="funnel-outline" size={18} color="#64748b" />
              <Text style={tw`text-slate-600 text-sm ml-2 font-medium`}>Filter</Text>
            </Pressable>
          </View>

          {displayCollections.length === 0 ? (
            <View style={tw`items-center py-12`}>
              <Ionicons name="document-outline" size={64} color="#cbd5e1" />
              <Text style={tw`text-slate-400 text-base mt-4 font-medium`}>
                Tidak ada hasil ditemukan
              </Text>
              <Text style={tw`text-slate-400 text-sm mt-1`}>
                Coba kata kunci lain
              </Text>
            </View>
          ) : (
            <>
              {displayCollections.map((item, index) => (
                <Pressable 
                  key={item.id} 
                  onPress={() => handleItemPress(item)}
                  style={tw`flex-row bg-white rounded-2xl p-5 mb-4 shadow-md border border-gray-100 active:bg-gray-50 active:scale-98`}
                >
                  <View style={tw`relative mr-5`}>
                    <View style={tw`w-28 h-36 rounded-xl overflow-hidden bg-emerald-50 shadow-sm`}>
                      <Image 
                        source={item.image}
                        style={tw`w-full h-full`}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={tw`absolute -top-2 -left-2 bg-blue-500 px-2.5 py-1 rounded-md shadow-sm`}>
                      <Text style={tw`text-white text-xs font-bold`}>Item</Text>
                    </View>
                  </View>

                  <View style={tw`flex-1 justify-center pr-3`}>
                    <Text 
                      style={tw`font-bold text-slate-800 text-lg mb-2.5 leading-6`} 
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>
                    <View style={tw`flex-row items-center mb-2`}>
                      <Ionicons name="document-text-outline" size={16} color="#64748b" />
                      <Text style={tw`text-slate-500 text-sm ml-2 flex-1`} numberOfLines={1}>
                        {item.author}
                      </Text>
                    </View>
                    <View style={tw`flex-row items-center`}>
                      <Ionicons name="calendar-outline" size={16} color="#64748b" />
                      <Text style={tw`text-slate-400 text-sm ml-2`}>
                        {item.year}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={tw`justify-center`}>
                    <Ionicons name="chevron-forward" size={26} color="#10b981" />
                  </View>
                </Pressable>
              ))}

              {searchQuery.trim() === '' && (
                <Pressable 
                  onPress={handleLoadMore}
                  style={tw`bg-emerald-50 border-2 border-emerald-200 border-dashed rounded-xl py-4 items-center mt-2 active:bg-emerald-100`}
                >
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="add-circle-outline" size={20} color="#059669" />
                    <Text style={tw`text-emerald-600 font-semibold ml-2`}>
                      Lihat Lebih Banyak
                    </Text>
                  </View>
                </Pressable>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}