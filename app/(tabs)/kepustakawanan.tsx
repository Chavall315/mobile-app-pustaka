import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'; // Pastikan sudah terinstall

export default function RepositoryScreen() {
  return (
    <ScrollView style={tw`bg-slate-50`} contentContainerStyle={tw`pb-10`}>
      
      {/* Header Modern */}
      <View style={tw`px-6 pt-16 pb-8 bg-emerald-800 rounded-b-[30px]`}>
        <Text style={tw`text-white text-3xl font-extrabold tracking-tight`}>
          Repositori
        </Text>
        <Text style={tw`text-emerald-100/80 text-base mt-1`}>
          Akses literatur digital pertanian terlengkap.
        </Text>
      </View>

      {/* Search Bar with Icon */}
      <View style={tw`px-6 -mt-6`}>
        <View style={tw`flex-row items-center bg-white rounded-2xl px-4 py-1 shadow-sm border border-gray-100`}>
          <Ionicons name="search-outline" size={20} color="#64748b" />
          <TextInput
            placeholder="Cari jurnal atau buku..."
            placeholderTextColor="#94a3b8"
            style={tw`flex-1 ml-3 h-12 text-gray-800`}
          />
        </View>
      </View>

      {/* Categories Section */}
      <View style={tw`px-6 mt-8`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-lg font-bold text-slate-800`}>Kategori</Text>
          <Pressable><Text style={tw`text-emerald-700 font-medium`}>Lihat Semua</Text></Pressable>
        </View>

        <View style={tw`flex-row flex-wrap gap-3`}>
          {['Buku', 'Buletin', 'Jurnal', 'Infografis'].map((item, idx) => (
            <Pressable
              key={item}
              style={tw`${idx === 0 ? 'bg-emerald-700' : 'bg-white border border-gray-200'} px-5 py-2.5 rounded-xl shadow-sm`}
            >
              <Text style={tw`${idx === 0 ? 'text-white' : 'text-slate-600'} font-semibold`}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Content List with Cards */}
      <View style={tw`px-6 mt-8`}>
        <Text style={tw`text-lg font-bold text-slate-800 mb-4`}>
          Koleksi Terbaru
        </Text>

        {[1, 2, 3].map(i => (
          <Pressable
            key={i}
            style={tw`flex-row bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-50`}
          >
            {/* Thumbnail Placeholder */}
            <View style={tw`w-16 h-20 bg-emerald-50 rounded-lg items-center justify-center mr-4`}>
                <Ionicons name="document-text-outline" size={24} color="#065f46" />
            </View>

            <View style={tw`flex-1 justify-center`}>
              <Text style={tw`font-bold text-slate-800 text-base mb-1`} numberOfLines={1}>
                Panduan Budidaya Hidroponik {i}
              </Text>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-emerald-700 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded mr-2`}>
                  BUKU
                </Text>
                <Text style={tw`text-slate-400 text-xs`}>
                  2024 • Admin Pusat
                </Text>
              </View>
            </View>
            
            <View style={tw`justify-center`}>
                <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}