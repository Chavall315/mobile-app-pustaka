import { collections } from '@/data/collections';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export default function LengkapScreen() {
  const [showAbstract, setShowAbstract] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = collections.find(c => c.id === Number(id));

  if (!item) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-gray-50`}>
        <Ionicons name="alert-circle-outline" size={64} color="#9CA3AF" />
        <Text style={tw`text-gray-600 mt-4 text-lg`}>Data tidak ditemukan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`bg-white shadow-sm`}>
        <View style={tw`flex-row items-center bg-emerald-800 px-5 py-4`}>
          <Pressable 
            onPress={() => router.back()} 
            style={tw`mr-3 p-2 -ml-2 rounded-full active:bg-gray-100`}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffffff" />
          </Pressable>
          <Text style={tw`text-lg font-semibold text-white flex-1`} numberOfLines={1}>
            Detail Publikasi
          </Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={tw`pb-0`} 
        showsVerticalScrollIndicator={false}
        style={tw`flex-1`}
      >
        <View style={tw`bg-white px-6 pt-8 pb-6`}>
          <View style={tw`items-center`}>
            <View style={tw`shadow-lg`}>
              <Image
                source={item.image}
                style={tw`w-44 h-60 rounded-2xl`}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        <View style={tw`bg-white px-6 py-6`}>
          <Text style={tw`text-2xl font-bold text-gray-900 leading-8`}>
            {item.title}
          </Text>
          <View style={tw`flex-row items-center mt-3`}>
            <View style={tw`bg-emerald-50 px-3 py-1.5 rounded-full`}>
              <Text style={tw`text-emerald-700 font-semibold text-sm`}>
                {item.year}
              </Text>
            </View>
          </View>
        </View>

        <View style={tw`bg-white px-6 py-6`}>
          <View style={tw`flex-row items-center mb-3`}>
            <View style={tw`w-1 h-5 bg-emerald-500 rounded-full mr-3`} />
            <Text style={tw`text-lg font-bold text-gray-900`}>Abstract</Text>
          </View>
          
          <Text 
            style={tw`text-gray-700 leading-6 text-base`}
            numberOfLines={showAbstract ? undefined : 4}
          >
            {item.abstract}
          </Text>

          {item.abstract?.length > 200 && (
            <Pressable 
              onPress={() => setShowAbstract(!showAbstract)}
              style={tw`mt-4 flex-row items-center`}
            >
              <Text style={tw`text-emerald-600 font-semibold mr-1`}>
                {showAbstract ? 'Sembunyikan' : 'Baca Selengkapnya'}
              </Text>
              <Ionicons 
                name={showAbstract ? "chevron-up" : "chevron-down"} 
                size={18} 
                color="#059669" 
              />
            </Pressable>
          )}
        </View>

        <View style={tw`bg-white w-full px-6 py-6 pb-20`}>
          <View style={tw`flex-row items-center mb-5`}>
            <View style={tw`w-1 h-5 bg-emerald-500 rounded-full mr-3`} />
            <Text style={tw`text-lg font-bold text-gray-900`}>
              Informasi Publikasi
            </Text>
          </View>

          <View style={tw`mb-5`}>
            <View style={tw`flex-row items-center mb-2`}>
              <View style={tw`w-8 h-8 bg-blue-50 rounded-full items-center justify-center mr-3`}>
                <Ionicons name="person-outline" size={16} color="#2563EB" />
              </View>
              <Text style={tw`text-gray-500 text-sm font-medium`}>
                Authors
              </Text>
            </View>
            <Text style={tw`text-blue-700 leading-6 ml-11 text-base`}>
              {item.author}
            </Text>
          </View>

          <View style={tw`h-px bg-gray-100 mb-5`} />

          <View style={tw`mb-5`}>
            <View style={tw`flex-row items-center mb-2`}>
              <View style={tw`w-8 h-8 bg-purple-50 rounded-full items-center justify-center mr-3`}>
                <Ionicons name="business-outline" size={16} color="#7C3AED" />
              </View>
              <Text style={tw`text-gray-500 text-sm font-medium`}>
                Publisher
              </Text>
            </View>
            <Text style={tw`text-gray-900 leading-6 ml-11 text-base`}>
              {item.publisher}
            </Text>
          </View>

          <View style={tw`h-px bg-gray-100 mb-5`} />

          <View>
            <View style={tw`flex-row items-center mb-2`}>
              <View style={tw`w-8 h-8 bg-emerald-50 rounded-full items-center justify-center mr-3`}>
                <Ionicons name="folder-outline" size={16} color="#059669" />
              </View>
              <Text style={tw`text-gray-500 text-sm font-medium`}>
                Collection
              </Text>
            </View>
            <Text style={tw`text-blue-700 leading-6 ml-11 text-base`}>
              {item.koleksi}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}