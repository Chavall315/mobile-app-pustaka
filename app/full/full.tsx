import { collections } from '@/data/collections';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, Text, TextInput, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export default function FullScreen() {
    const [visible, setVisible] = useState(false);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [authorSearch, setAuthorSearch] = useState('');

    const authors = [
        { name: 'Biro Hubungan Masyarakat dan Informasi Publik', count: 733 },
        { name: 'Kementerian Pertanian, Badan Penelitian dan Pengembangan Pertanian', count: 614 },
        { name: 'Pusat Perpustakaan dan Literasi Pertanian', count: 319 },
        { name: 'Ditjen Pengolahan dan Pemasaran Hasil Pertanian/PPHP', count: 317 },
        { name: 'BPTP Jambi', count: 242 },
    ];

    const handleFilterPress = () => setVisible(true);
    const closeModal = () => setVisible(false);

    const toggleAuthor = (name: string) => {
        setSelectedAuthors((prev) =>
        prev.includes(name)
            ? prev.filter((a) => a !== name)
            : [...prev, name]
        );
    };

    const handleItemPress = (item: { id: number }) => {
        router.push({
        pathname: '/lengkap/lengkap',
        params: { id: item.id.toString() },
        });
    };

    const handleBack = () => {
        router.push('/explore');
    };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      {/* Header Section - Compact */}
      <View style={tw`bg-emerald-700 px-6 py-5`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center flex-1 mr-4`}>
            <Pressable 
              onPress={handleBack} 
              style={tw`w-10 h-10 rounded-xl bg-white/20 items-center justify-center mr-4`}
            >
              <Ionicons name="arrow-back" size={22} color="#ffffff" />
            </Pressable>
            
            <View style={tw`flex-1`}>
              <Text style={tw`text-white text-xl font-bold`}>
                Recent Submissions
              </Text>
              <Text style={tw`text-emerald-100 text-sm mt-0.5`}>
                {collections.length} publikasi tersedia
              </Text>
            </View>
          </View>

          <Pressable
            onPress={handleFilterPress}
            style={tw`bg-white rounded-xl px-4 py-2.5 flex-row items-center shadow-lg`}
          >
            <Ionicons name="options-outline" size={18} color="#059669" />
            <Text style={tw`text-slate-800 text-sm font-semibold ml-2`}>
              Filter
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView 
        style={tw`flex-1 bg-gray-50`}
        contentContainerStyle={tw`px-5 pt-5 pb-10`}
        showsVerticalScrollIndicator={false}
      >
        {/* Active Filters Indicator */}
        {selectedAuthors.length > 0 && (
          <View style={tw`bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center flex-1`}>
              <View style={tw`w-6 h-6 bg-blue-500 rounded-full items-center justify-center mr-3`}>
                <Text style={tw`text-white text-xs font-bold`}>
                  {selectedAuthors.length}
                </Text>
              </View>
              <Text style={tw`text-blue-700 text-sm font-medium`}>
                Filter aktif
              </Text>
            </View>
            <Pressable onPress={() => setSelectedAuthors([])}>
              <Text style={tw`text-blue-600 text-sm font-semibold`}>
                Hapus semua
              </Text>
            </Pressable>
          </View>
        )}

        {/* FILTER MODAL */}
        <Modal visible={visible} animationType="slide" transparent>
          <View style={tw`flex-1 bg-black/50 justify-end`}>
            <View style={tw`bg-white rounded-t-3xl max-h-[90%]`}>

              {/* Modal Header */}
              <View style={tw`px-6 pt-6 pb-4`}>
                <View style={tw`flex-row justify-between items-center mb-1`}>
                  <Text style={tw`text-2xl font-bold text-slate-800`}>Filter Publikasi</Text>
                  <Pressable 
                    onPress={closeModal}
                    style={tw`w-10 h-10 bg-gray-100 rounded-full items-center justify-center`}
                  >
                    <Ionicons name="close" size={22} color="#64748b" />
                  </Pressable>
                </View>
                <Text style={tw`text-slate-500 text-sm`}>
                  Temukan publikasi berdasarkan author
                </Text>
              </View>

              <ScrollView 
                contentContainerStyle={tw`px-6 pb-6`}
                showsVerticalScrollIndicator={false}
              >
                {/* Search Box */}
                <View style={tw`relative mb-6`}>
                  <View style={tw`absolute left-4 top-3.5 z-10`}>
                    <Ionicons name="search-outline" size={20} color="#94a3b8" />
                  </View>
                  <TextInput
                    placeholder="Cari nama author..."
                    value={authorSearch}
                    onChangeText={setAuthorSearch}
                    style={tw`bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm`}
                    placeholderTextColor="#94a3b8"
                  />
                </View>

                {/* AUTHOR LIST */}
                <View style={tw`bg-white rounded-2xl overflow-hidden border border-gray-200`}>
                  {authors
                    .filter((a) =>
                      a.name.toLowerCase().includes(authorSearch.toLowerCase())
                    )
                    .map((item, index) => (
                      <Pressable
                        key={item.name}
                        onPress={() => toggleAuthor(item.name)}
                        style={[
                          tw`flex-row items-center justify-between px-4 py-4`,
                          index !== authors.length - 1 && tw`border-b border-gray-100`
                        ]}
                      >
                        <View style={tw`flex-row items-center flex-1 mr-3`}>
                          <View 
                            style={[
                              tw`w-6 h-6 rounded-lg mr-3 items-center justify-center border-2`,
                              selectedAuthors.includes(item.name) 
                                ? tw`bg-emerald-500 border-emerald-500` 
                                : tw`border-gray-300`
                            ]}
                          >
                            {selectedAuthors.includes(item.name) && (
                              <Ionicons name="checkmark" size={16} color="#fff" />
                            )}
                          </View>
                          <Text style={tw`text-slate-700 text-sm flex-1 leading-5`}>
                            {item.name}
                          </Text>
                        </View>

                        <View style={tw`bg-slate-100 px-3 py-1.5 rounded-full`}>
                          <Text style={tw`text-slate-700 text-xs font-semibold`}>
                            {item.count}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                </View>

                {/* Action Buttons */}
                <View style={tw`flex-row mt-6`}>
                  <Pressable
                    onPress={() => setSelectedAuthors([])}
                    style={tw`flex-1 bg-gray-100 rounded-xl py-4 mr-3`}
                  >
                    <Text style={tw`text-slate-700 text-center font-semibold`}>
                      Reset
                    </Text>
                  </Pressable>
                  
                  <Pressable
                    onPress={closeModal}
                    style={tw`flex-1 bg-emerald-600 rounded-xl py-4 shadow-sm`}
                  >
                    <Text style={tw`text-white text-center font-semibold`}>
                      Terapkan Filter
                    </Text>
                  </Pressable>
                </View>

              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* COLLECTION LIST - Bigger Cards */}
        <View>
          {collections.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={() => handleItemPress(item)}
              style={tw`bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 mb-5`}
            >
              <View style={tw`flex-row p-5`}>
                {/* Image Container - Bigger */}
                <View style={tw`mr-5`}>
                  <View style={tw`relative`}>
                    <View style={tw`w-32 h-44 rounded-xl overflow-hidden bg-gray-100 shadow-sm`}>
                      <Image 
                        source={item.image} 
                        style={tw`w-full h-full`}
                        resizeMode="cover"
                      />
                    </View>
                    {/* Year Badge */}
                    <View style={tw`absolute bottom-2 left-2 bg-black/80 px-2.5 py-1 rounded-lg`}>
                      <Text style={tw`text-white text-xs font-bold`}>
                        {item.year}
                      </Text>
                    </View>
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
                    
                    <View style={tw`flex-row items-center mb-2`}>
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
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}