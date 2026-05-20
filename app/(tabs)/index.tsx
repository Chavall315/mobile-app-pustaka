import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const featuredBooks = [
  {
    title: "Penyuluhan pertanian / Mayasari Pengembangan Sinar Tani",
    coverUrl:
      "https://www.kikp-pertanian.id/pustaka/uploaded_files/sampul_koleksi/original/Monograf/4647.jpg",
    href: "/detail/detail_buku",
  },
  {
    title: "Dinamika penyuluhan pertanian / Leta Rafael Levis",
    coverUrl:
      "https://www.kikp-pertanian.id/pustaka/uploaded_files/sampul_koleksi/original/Monograf/63496.jpg",
    href: "/detail/detail_buku",
  },
  {
    title:
      "Optimalisasi lahan rawa: akselerasi menuju lumbung pangan dunia 2045",
    coverUrl:
      "https://www.kikp-pertanian.id/pustaka/uploaded_files/sampul_koleksi/original/Monograf/76563.jpg",
    href: "/detail/detail_buku",
  },
];

const recentBooks = [
  {
    title: "Hama dan penyakit pada tanaman kentang",
    href: "/detail/detail_buku",
  },
  {
    title: "Proceedings seminar sistem pengurusan hutan alam",
    href: "/detail/detail_buku",
  },
  {
    title: "Simposium pemanfaatan tempe dalam kesehatan",
    href: "/detail/detail_buku",
  },
];

// ── Book card ──────────────────────────────────────────────
type BookItem = {
  title: string;
  coverUrl?: string;
  href: string;
};

function BookCard({ item }: { item: BookItem }) {
  const [imgError, setImgError] = useState(false);
  const hasCover = item.coverUrl && !imgError;

  return (
    <Pressable
      style={tw`w-30 mr-3.5`}
      onPress={() => router.push(item.href as any)}
    >
      {/* Cover */}
      <View
        style={[
          tw`w-30 rounded-xl overflow-hidden`,
          { height: 164, borderWidth: 0.5, borderColor: "rgba(0,0,0,0.07)" },
        ]}
      >
        {hasCover ? (
          <Image
            source={{ uri: item.coverUrl }}
            style={tw`w-full h-full`}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <PlaceholderCover />
        )}

        {/* Badge */}
        <View
          style={[
            tw`absolute top-2 left-2 px-1.5 py-0.5 rounded-md`,
            { backgroundColor: "rgba(4,120,87,0.88)" },
          ]}
        >
          <Text
            style={[
              tw`text-[9px] font-semibold uppercase tracking-wider`,
              { color: "#C6EADB" },
            ]}
          >
            Buku
          </Text>
        </View>
      </View>

      {/* Title */}
      <Text
        style={[tw`mt-2.5 text-xs font-medium leading-5`, { color: "#1a1a1a" }]}
        numberOfLines={2}
      >
        {item.title}
      </Text>

      {/* Status */}
      <View style={tw`flex-row items-center mt-1 gap-1`}>
        <View
          style={[tw`w-1.5 h-1.5 rounded-full`, { backgroundColor: "#059669" }]}
        />
        <Text style={[tw`text-[11px]`, { color: "#047857" }]}>Tersedia</Text>
      </View>
    </Pressable>
  );
}

function PlaceholderCover() {
  return (
    <View
      style={[
        tw`flex-1 items-center justify-center`,
        { backgroundColor: "#DDE6E1" },
      ]}
    >
      <View style={tw`gap-1.5 items-center`}>
        {[44, 32, 38].map((w, i) => (
          <View
            key={i}
            style={[
              tw`h-0.5 rounded-full`,
              { width: w, backgroundColor: "#B8CCBF" },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

// ── Section header ─────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  return (
    <View style={tw`flex-row items-end justify-between px-5 mb-3.5`}>
      <View style={tw`gap-1`}>
        <View
          style={[tw`w-5 h-0.5 rounded-full`, { backgroundColor: "#F0B429" }]}
        />
        <Text style={[tw`text-sm font-medium`, { color: "#1a1a1a" }]}>
          {title}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.65}>
        <Text style={[tw`text-xs font-medium`, { color: "#047857" }]}>
          Lihat semua
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Main screen ────────────────────────────────────────────
const OPACScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearch = () => {
    console.log("Search:", searchQuery);
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#F4F6F3" }]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-10`}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View
          style={[
            tw`px-6 pt-8 pb-8 rounded-b-[32px]`,
            { backgroundColor: "#047857" },
          ]}
        >
          <Text
            style={[
              tw`text-xs font-medium mb-1.5 uppercase`,
              { color: "#6EE7B7", letterSpacing: 1.8 },
            ]}
          >
            Katalog Perpustakaan
          </Text>

          {/* Title — swap fontFamily with your loaded DM Serif Display if available */}
          <Text
            style={[
              tw`text-[34px] mb-1`,
              { color: "#F0FDF4", fontFamily: "serif", lineHeight: 40 },
            ]}
          >
            OPAC
          </Text>

          <Text style={[tw`text-sm mb-6`, { color: "#A7F3D0" }]}>
            Perpustakaan Pertanian
          </Text>

          {/* Search input */}
          <View
            style={[
              tw`flex-row items-center rounded-2xl px-4 h-12 mb-3`,
              {
                backgroundColor: searchFocused
                  ? "rgba(255,255,255,0.14)"
                  : "rgba(255,255,255,0.09)",
                borderWidth: 0.5,
                borderColor: searchFocused
                  ? "rgba(255,255,255,0.28)"
                  : "rgba(255,255,255,0.15)",
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={17}
              color="rgba(240,250,245,0.5)"
            />
            <TextInput
              placeholder="Cari judul, pengarang, subjek..."
              placeholderTextColor="rgba(240,250,245,0.35)"
              style={[tw`flex-1 ml-2.5 text-sm`, { color: "#F0FAF5" }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
          </View>

          {/* Search button */}
          <TouchableOpacity
            style={[
              tw`flex-row items-center justify-center h-11 rounded-[13px] gap-2`,
              { backgroundColor: "#065F46" },
            ]}
            activeOpacity={0.75}
            onPress={handleSearch}
          >
            <Ionicons name="search-outline" size={15} color="#D4F0E3" />
            <Text style={[tw`text-sm font-medium`, { color: "#D4F0E3" }]}>
              Cari Sekarang
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Collections ── */}
        <View style={tw`pt-6`}>
          {/* Koleksi Unggulan */}
          <View style={tw`mb-7`}>
            <SectionHeader title="Koleksi Unggulan" />
            <FlatList
              data={featuredBooks}
              horizontal
              contentContainerStyle={tw`px-5`}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, i) => `featured-${i}`}
              renderItem={({ item }) => <BookCard item={item} />}
            />
          </View>

          {/* Buku Terbaru */}
          <View style={tw`mb-7`}>
            <SectionHeader title="Buku Terbaru" />
            <FlatList
              data={recentBooks}
              horizontal
              contentContainerStyle={tw`px-5`}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, i) => `recent-${i}`}
              renderItem={({ item }) => <BookCard item={item} />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OPACScreen;
