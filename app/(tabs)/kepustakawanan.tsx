import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export default function RepositoryScreen() {

  const collections: Array<{ id: number; title: string; type: string; year: string; author: string; image: any }> = [
    { id: 1, title: 'Panduan Budidaya Hidroponik Modern', type: 'BUKU', year: '2024', author: 'Dr. Ahmad Santoso', image: require('../../assets/images/pdf.png') },
    { id: 2, title: 'Teknologi Pertanian Berkelanjutan', type: 'JURNAL', year: '2024', author: 'Prof. Sri Rahayu', image: require('../../assets/images/pdf.png') },
    { id: 3, title: 'Inovasi Pupuk Organik Nusantara', type: 'BULETIN', year: '2023', author: 'Tim Peneliti BPTP', image: require('../../assets/images/pdf.png') },
    { id: 4, title: 'Analisis Informasi menentukan konsep-konsep penting', type: 'PDF', year: '2022', author: 'Tim Peneliti BPTP', image: require('../../assets/images/pdf.png') },
    { id: 5, title: 'Pengelolaan Mikrofis', type: 'BULETIN', year: '2022', author: 'Tim Peneliti BPTP', image: require('../../assets/images/pdf.png') },
  ];
  
  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-10 bg-gray-50`}>
        <View style={tw`px-6 pt-12 pb-10 bg-emerald-800 rounded-b-[32px] shadow-lg`}>
          <View style={tw`flex-row justify-between items-start mb-2`}>
            <View style={tw`flex-1`}>
              <Text style={tw`text-white text-3xl font-extrabold tracking-tight`}>
                Repositori
              </Text>
              <Text style={tw`text-emerald-100 text-base mt-2 leading-5`}>
                Akses literatur digital pertanian terlengkap
              </Text>
            </View>
          </View>
        </View>

        <View style={tw`px-6 mt-8`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-bold text-slate-800`}>
              Petunjuk Teknis Bagi Pustakawan
            </Text>
          </View>

          {collections.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {}}
              accessibilityRole="button"
              style={tw`flex-row bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 active:bg-gray-50`}
            >
              <View style={tw`w-18 h-24 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl items-center justify-center mr-4 shadow-sm`}>
                <Image source={item.image} style={tw`w-12 h-16`} resizeMode="contain" />
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
      </ScrollView>
    </SafeAreaView>
  );
}