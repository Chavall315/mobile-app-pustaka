import { Feather, Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
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

const DATA = [
  {
    id: 1,
    title: "Panduan Budidaya Hidroponik Modern",
    type: "BUKU",
    year: "2024",
    author: "Dr. Ahmad Santoso",
    size: "4.2 MB",
    pages: 248,
  },
  {
    id: 2,
    title: "Teknologi Pertanian Berkelanjutan",
    type: "JURNAL",
    year: "2024",
    author: "Prof. Sri Rahayu",
    size: "2.8 MB",
    pages: 156,
  },
  {
    id: 3,
    title: "Inovasi Pupuk Organik Nusantara",
    type: "BULETIN",
    year: "2023",
    author: "Tim Peneliti BPTP",
    size: "1.5 MB",
    pages: 84,
  },
  {
    id: 4,
    title: "Analisis Informasi menentukan konsep-konsep penting",
    type: "ARTIKEL",
    year: "2022",
    author: "Tim Peneliti BPTP",
    size: "5.0 MB",
    pages: 32,
  },
  {
    id: 5,
    title: "Pengelolaan Hama Terpadu pada Tanaman Padi",
    type: "BULETIN",
    year: "2022",
    author: "Dr. Budi Hartono",
    size: "0.9 MB",
    pages: 48,
  },
];

const FILTERS = ["SEMUA", "BUKU", "JURNAL", "BULETIN", "ARTIKEL"];

const TYPE_STYLES = {
  BUKU: {
    thumb: { backgroundColor: "#EBF4FF" },
    icon: "#1D5FA3",
    badge: { backgroundColor: "#D6EAFF" },
    badgeText: { color: "#0F4B8A" },
  },
  JURNAL: {
    thumb: { backgroundColor: "#EEE9FB" },
    icon: "#5A3CA8",
    badge: { backgroundColor: "#DDD7F6" },
    badgeText: { color: "#3D2880" },
  },
  BULETIN: {
    thumb: { backgroundColor: "#FEF3E2" },
    icon: "#9A5A0A",
    badge: { backgroundColor: "#FDE8BB" },
    badgeText: { color: "#7A4508" },
  },
  ARTIKEL: {
    thumb: { backgroundColor: "#EDFBF3" },
    icon: "#136B38",
    badge: { backgroundColor: "#C8F3DC" },
    badgeText: { color: "#0D522A" },
  },
};

const DEFAULT_TYPE = {
  thumb: { backgroundColor: "#F1F5F9" },
  icon: "#475569",
  badge: { backgroundColor: "#E2E8F0" },
  badgeText: { color: "#334155" },
};

export default function RepositoryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState("SEMUA");
  const inputRef = useRef(null);

  const clearSearch = () => {
    setSearchQuery("");
    inputRef.current?.blur();
  };

  const displayedItems = DATA.filter((item) => {
    const matchFilter = activeFilter === "SEMUA" || item.type === activeFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <SafeAreaView style={tw`flex-1 bg-slate-100`}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-10`}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View
          style={[
            tw`px-6 pt-8 pb-7 rounded-b-[32px]`,
            { backgroundColor: "#047857" },
          ]}
        >
          {/* Label */}
          <Text
            style={[
              tw`text-xs font-medium mb-2 tracking-widest uppercase`,
              { color: "#6EBD97", letterSpacing: 1.8 },
            ]}
          >
            Perpustakaan Digital
          </Text>

          {/* Title */}
          <Text
            style={[
              tw`text-3xl mb-1`,
              {
                color: "#F0FAF5",
                fontWeight: "400",
                fontFamily: "serif",
                lineHeight: 38,
              },
            ]}
          >
            Kepustakawanan
          </Text>

          {/* Subtitle */}
          <Text style={[tw`text-sm mb-5`, { color: "#7ABFA1" }]}>
            {DATA.length} dokumen tersedia
          </Text>

          {/* Search bar */}
          <View
            style={[
              tw`flex-row items-center rounded-2xl px-4 h-12`,
              {
                backgroundColor: searchFocused
                  ? "rgba(255,255,255,0.13)"
                  : "rgba(255,255,255,0.08)",
                borderWidth: 0.5,
                borderColor: searchFocused
                  ? "rgba(255,255,255,0.28)"
                  : "rgba(255,255,255,0.15)",
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={18}
              color="rgba(240,250,245,0.55)"
            />
            <TextInput
              ref={inputRef}
              placeholder="Judul, penulis, atau tipe dokumen..."
              placeholderTextColor="rgba(240,250,245,0.35)"
              style={[tw`flex-1 ml-3 text-sm`, { color: "#F0FAF5" }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <Pressable
                onPress={clearSearch}
                hitSlop={10}
                style={[
                  tw`w-5 h-5 rounded-full items-center justify-center`,
                  { backgroundColor: "rgba(255,255,255,0.2)" },
                ]}
              >
                <Ionicons name="close" size={11} color="#F0FAF5" />
              </Pressable>
            )}
          </View>

          {/* Search result count */}
          {searchQuery.trim().length > 0 && (
            <Text style={[tw`text-xs mt-3`, { color: "#7ABFA1" }]}>
              {displayedItems.length} dokumen ditemukan
            </Text>
          )}
        </View>

        {/* ── Filter chips ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`px-6 pt-4 pb-1 gap-2`}
        >
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setActiveFilter(f)}
                style={[
                  tw`px-4 py-1.5 rounded-full`,
                  {
                    backgroundColor: isActive ? "#047857" : "#ffffff",
                    borderWidth: 0.5,
                    borderColor: isActive ? "#047857" : "#E2E8F0",
                  },
                ]}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    tw`text-xs font-medium`,
                    { color: isActive ? "#F0FAF5" : "#64748b" },
                  ]}
                >
                  {f.charAt(0) + f.slice(1).toLowerCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Section header ── */}
        <View style={tw`flex-row items-center justify-between px-6 pt-5 pb-3`}>
          <Text
            style={[
              tw`text-xs font-medium tracking-widest uppercase`,
              { color: "#94a3b8", letterSpacing: 1.2 },
            ]}
          >
            {searchQuery.trim() ? "Hasil pencarian" : "Koleksi terbaru"}
          </Text>
          <Text style={tw`text-xs text-slate-400`}>
            {displayedItems.length} item
          </Text>
        </View>

        {/* ── Document list ── */}
        {displayedItems.length === 0 ? (
          <EmptyState />
        ) : (
          <View style={tw`px-4 gap-2.5`}>
            {displayedItems.map((item) => (
              <DocCard key={item.id} item={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function DocCard({ item }) {
  const style = TYPE_STYLES[item.type] || DEFAULT_TYPE;

  return (
    <Pressable
      style={({ pressed }) => [
        tw`bg-white rounded-[18px] p-4 flex-row`,
        {
          borderWidth: 0.5,
          borderColor: pressed ? "#CBD5E1" : "#E8EDF3",
          backgroundColor: pressed ? "#F8FAFC" : "#ffffff",
          gap: 14,
        },
      ]}
      onPress={() => console.log("Open:", item.id)}
    >
      {/* Thumbnail */}
      <View style={tw`items-center gap-1.5`}>
        <View
          style={[
            tw`w-13 h-16 rounded-xl items-center justify-center`,
            style.thumb,
          ]}
        >
          <Ionicons name="document-text-outline" size={26} color={style.icon} />
        </View>
        <View
          style={[tw`px-1.5 py-0.5 rounded-md w-13 items-center`, style.badge]}
        >
          <Text
            style={[
              tw`text-[9px] font-semibold tracking-wider`,
              style.badgeText,
            ]}
          >
            {item.type}
          </Text>
        </View>
      </View>

      {/* Body */}
      <View style={tw`flex-1 min-w-0`}>
        {/* Year + pages */}
        <View style={tw`flex-row items-center mb-1 gap-1.5`}>
          <Text style={tw`text-xs text-slate-400`}>{item.year}</Text>
          <View
            style={[
              tw`w-0.5 h-0.5 rounded-full`,
              { backgroundColor: "#CBD5E1" },
            ]}
          />
          <Text style={tw`text-xs text-slate-400`}>{item.pages} halaman</Text>
        </View>

        {/* Title */}
        <Text
          style={tw`text-sm font-medium text-slate-900 leading-5 mb-1`}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        {/* Author */}
        <Text style={tw`text-xs text-slate-500 mb-3`} numberOfLines={1}>
          {item.author}
        </Text>

        {/* Footer */}
        <View style={tw`flex-row items-center justify-between`}>
          {/* Size */}
          <View style={tw`flex-row items-center gap-1`}>
            <Feather name="hard-drive" size={11} color="#94a3b8" />
            <Text style={tw`text-xs text-slate-400`}>{item.size}</Text>
          </View>

          {/* Download button */}
          <TouchableOpacity
            style={[
              tw`flex-row items-center rounded-xl px-3 py-1.5 gap-1`,
              { backgroundColor: "#047857" },
            ]}
            activeOpacity={0.75}
            onPress={() => console.log("Download:", item.id)}
          >
            <Feather name="download" size={11} color="#F0FAF5" />
            <Text style={[tw`text-xs font-medium`, { color: "#F0FAF5" }]}>
              Unduh
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

function EmptyState() {
  return (
    <View style={tw`items-center justify-center py-16 px-8`}>
      <View
        style={[
          tw`w-14 h-14 rounded-full items-center justify-center mb-4`,
          { backgroundColor: "#F1F5F9" },
        ]}
      >
        <Ionicons name="search-outline" size={24} color="#94a3b8" />
      </View>
      <Text style={tw`text-base font-medium text-slate-900 mb-1.5`}>
        Tidak ada hasil
      </Text>
      <Text style={tw`text-sm text-slate-400 text-center leading-5`}>
        Coba kata kunci lain atau ubah filter pencarian
      </Text>
    </View>
  );
}
