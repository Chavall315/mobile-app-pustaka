import { Collection, collections } from '@/data/collections';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export default function RepositoryScreen() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([])

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

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredCollections([]);
      return;
    }

    const filtered = collections.filter((item: Collection) =>
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

  
  const handleItemPress = (item: { id: number }) => {
    router.push({
      pathname: '/lengkap/lengkap',
      params: { id: item.id.toString() },
    });
  };

  const handleLoadMore = () => {
    router.push({
      pathname: '/full/full'
    })
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-10 bg-gray-50`}>
        {/* Header Section */}
        <View style={tw`px-6 pt-10 pb-8 bg-emerald-700 rounded-b-3xl`}>
          <View style={tw`mb-6`}>
            <View style={tw`flex-row items-center mb-2`}>
              <View style={tw`w-1.5 h-8 bg-emerald-300 rounded-full mr-3`} />
              <Text style={tw`text-white text-3xl font-bold tracking-tight`}>
                Repositori
              </Text>
            </View>
            <Text style={tw`text-emerald-100 text-sm leading-5 ml-5`}>
              Akses literatur digital pertanian terlengkap
            </Text>
          </View>

          {/* Search Bar */}
          <View style={[
            tw`flex-row items-center bg-white rounded-2xl px-4 shadow-lg`,
            searchFocused && tw`ring-2 ring-emerald-400`
          ]}>
            <View style={tw`w-10 h-10 bg-emerald-50 rounded-xl items-center justify-center`}>
              <Ionicons name="search-outline" size={20} color="#059669" />
            </View>
            <TextInput 
              placeholder="Cari jurnal, buku, atau artikel..." 
              placeholderTextColor="#94a3b8" 
              style={tw`flex-1 ml-3 h-14 text-gray-800 text-base`}
              value={searchQuery}
              onChangeText={handleSearch}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchQuery.trim() !== '' && (
              <Pressable onPress={clearSearch} style={tw`w-8 h-8 bg-gray-100 rounded-full items-center justify-center mr-2`}>
                <Ionicons name="close" size={16} color="#64748b" />
              </Pressable>
            )}
            {searchFocused && (
              <Pressable style={tw`w-10 h-10 bg-emerald-50 rounded-xl items-center justify-center`}>
                <Ionicons name="options-outline" size={20} color="#059669" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Categories Section */}
        <View style={tw`mt-8`}>
          <View style={tw`mb-5 px-6`}>
            <View style={tw`flex-row items-center mb-1`}>
              <View style={tw`w-1 h-6 bg-emerald-500 rounded-full mr-3`} />
              <Text style={tw`text-xl font-bold text-slate-800`}>
                Communities in Repositori
              </Text>
            </View>
            <Text style={tw`text-sm text-slate-500 ml-7`}>
              Select a community to browse its collections.
            </Text>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={tw`px-6`}
          >
            {categories.map((item, index) => (
              <Pressable
                key={item}
                onPress={() => handleCategoryPress(item)}
                style={tw`bg-white border border-gray-200 px-5 py-3.5 rounded-xl shadow-sm mr-3`}
              >
                <Text style={tw`text-slate-700 font-semibold text-sm`}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Results Section */}
        <View style={tw`px-6 mt-8 mb-6`}>
          <View style={tw`mb-5`}>
            <View style={tw`flex-row items-center mb-1`}>
              <View style={tw`w-1 h-7 bg-emerald-500 rounded-full mr-3`} />
              <Text style={tw`text-2xl font-bold text-slate-800`}>
                {searchQuery.trim() !== '' ? 'Search Results' : 'Recent Submissions'}
              </Text>
            </View>
            <View style={tw`flex-row items-center ml-7 mt-1`}>
              <View style={tw`w-2 h-2 rounded-full bg-emerald-400 mr-2`} />
              <Text style={tw`text-sm text-slate-500`}>
                {displayCollections.length} publikasi {searchQuery.trim() !== '' ? 'ditemukan' : 'terbaru'}
              </Text>
            </View>
          </View>

          {displayCollections.length === 0 ? (
            <View style={tw`items-center py-16 bg-white rounded-2xl border border-gray-200`}>
              <View style={tw`w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4`}>
                <Ionicons name="search-outline" size={40} color="#cbd5e1" />
              </View>
              <Text style={tw`text-slate-700 text-lg font-semibold`}>
                Tidak ada hasil ditemukan
              </Text>
              <Text style={tw`text-slate-400 text-sm mt-2`}>
                Coba kata kunci lain
              </Text>
            </View>
          ) : (
            <>
              {displayCollections.map((item, index) => (
                <Pressable 
                  key={item.id} 
                  onPress={() => handleItemPress(item)}
                  style={tw`flex-row bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100`}
                >
                  {/* Image Container */}
                  <View style={tw`relative mr-5`}>
                    <View style={tw`w-32 h-44 rounded-xl overflow-hidden bg-gray-100 shadow-sm`}>
                      <Image 
                        source={item.image}
                        style={tw`w-full h-full`}
                        resizeMode="cover"
                      />
                    </View>
                    {/* Item Badge */}
                    <View style={tw`absolute -top-2 -left-2 bg-blue-600 px-3 py-1.5 rounded-lg shadow-md`}>
                      <Text style={tw`text-white text-xs font-bold`}>Item</Text>
                    </View>
                    {/* Year Badge */}
                    <View style={tw`absolute bottom-2 left-2 bg-black/80 px-2.5 py-1 rounded-lg`}>
                      <Text style={tw`text-white text-xs font-bold`}>
                        {item.year}
                      </Text>
                    </View>
                  </View>

                  {/* Content */}
                  <View style={tw`flex-1 justify-between py-1`}>
                    <View>
                      <Text 
                        style={tw`font-bold text-slate-800 text-lg leading-6 mb-3`} 
                        numberOfLines={3}
                      >
                        {item.title}
                      </Text>
                      
                      <View style={tw`flex-row items-center mb-2`}>
                        <View style={tw`w-5 h-5 bg-purple-100 rounded-md items-center justify-center mr-2`}>
                          <Ionicons name="business" size={12} color="#7c3aed" />
                        </View>
                        <Text style={tw`text-slate-600 text-sm flex-1`} numberOfLines={2}>
                          {item.publisher}
                        </Text>
                      </View>
                      
                      <View style={tw`flex-row items-center`}>
                        <View style={tw`w-5 h-5 bg-blue-100 rounded-md items-center justify-center mr-2`}>
                          <Ionicons name="person" size={12} color="#2563eb" />
                        </View>
                        <Text style={tw`text-slate-600 text-sm flex-1`} numberOfLines={2}>
                          {item.author}
                        </Text>
                      </View>
                    </View>

                    {/* Arrow Button */}
                    <View style={tw`flex-row justify-end mt-3`}>
                      <View style={tw`w-9 h-9 bg-emerald-500 rounded-xl items-center justify-center shadow-sm`}>
                        <Ionicons name="arrow-forward" size={18} color="#ffffff" />
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}

              {searchQuery.trim() === '' && (
                <Pressable 
                  onPress={handleLoadMore}
                  style={tw`bg-white border-2 border-emerald-500 rounded-2xl py-5 items-center mt-2 shadow-sm`}
                >
                  <View style={tw`flex-row items-center`}>
                    <View style={tw`w-8 h-8 bg-emerald-50 rounded-full items-center justify-center mr-3`}>
                      <Ionicons name="add" size={20} color="#059669" />
                    </View>
                    <Text style={tw`text-emerald-700 font-bold text-base`}>
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