import { Collection, collections } from "@/data/collections";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
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

const CATEGORIES = [
  "Buku",
  "Buletin",
  "Bunga Rampai",
  "Informasi dan Teknologi",
  "Jurnal",
  "Majalah",
  "Modul atau Laporan Pendidikan dan Pelatihan Pertanian",
  "Prosiding",
  "Warta",
];

export default function RepositoryScreen() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>(
    [],
  );
  const [activeCategory, setActiveCategory] = useState("Buku");

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredCollections([]);
      return;
    }
    const filtered = collections.filter(
      (item: Collection) =>
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        item.author.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCollections(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredCollections([]);
  };

  const displayCollections =
    searchQuery.trim() !== "" ? filteredCollections : collections;

  const handleItemPress = (item: { id: number }) => {
    router.push({
      pathname: "/lengkap/lengkap",
      params: { id: item.id.toString() },
    });
  };

  const handleLoadMore = () => {
    router.push({ pathname: "/full/full" });
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
            Literatur Digital Pertanian
          </Text>

          {/* swap fontFamily with DM Serif Display if loaded via expo-font */}
          <Text
            style={[
              tw`text-[34px] mb-1`,
              { color: "#F0FDF4", fontFamily: "serif", lineHeight: 40 },
            ]}
          >
            Repositori
          </Text>

          <Text style={[tw`text-sm mb-6`, { color: "#A7F3D0" }]}>
            Akses literatur digital pertanian terlengkap
          </Text>

          {/* Search bar */}
          <View
            style={[
              tw`flex-row items-center rounded-2xl px-4 h-12`,
              {
                backgroundColor: searchFocused
                  ? "rgba(255,255,255,0.18)"
                  : "rgba(255,255,255,0.12)",
                borderWidth: 0.5,
                borderColor: searchFocused
                  ? "rgba(255,255,255,0.32)"
                  : "rgba(255,255,255,0.2)",
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={17}
              color="rgba(240,253,244,0.5)"
            />
            <TextInput
              placeholder="Cari jurnal, buku, atau artikel..."
              placeholderTextColor="rgba(240,253,244,0.4)"
              style={[tw`flex-1 ml-2.5 text-sm`, { color: "#F0FDF4" }]}
              value={searchQuery}
              onChangeText={handleSearch}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              returnKeyType="search"
            />
            {searchQuery.trim() !== "" && (
              <Pressable
                onPress={clearSearch}
                hitSlop={10}
                style={[
                  tw`w-5 h-5 rounded-full items-center justify-center`,
                  { backgroundColor: "rgba(255,255,255,0.2)" },
                ]}
              >
                <Ionicons name="close" size={11} color="#F0FDF4" />
              </Pressable>
            )}
          </View>
        </View>

        {/* ── Categories ── */}
        <View style={tw`mt-6 mb-7`}>
          <View style={tw`px-5 mb-3.5 gap-1`}>
            <View
              style={[
                tw`w-5 h-0.5 rounded-full`,
                { backgroundColor: "#F0B429" },
              ]}
            />
            <Text style={[tw`text-sm font-medium`, { color: "#1a1a1a" }]}>
              Communities in Repositori
            </Text>
            <Text style={[tw`text-xs`, { color: "#94a3b8" }]}>
              Pilih komunitas untuk menelusuri koleksi
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-5 gap-2`}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setActiveCategory(cat)}
                  activeOpacity={0.75}
                  style={[
                    tw`px-3.5 py-2 rounded-xl`,
                    {
                      backgroundColor: isActive ? "#047857" : "#ffffff",
                      borderWidth: 0.5,
                      borderColor: isActive ? "#047857" : "#E2E8F0",
                    },
                  ]}
                >
                  <Text
                    style={[
                      tw`text-xs font-medium`,
                      { color: isActive ? "#F0FDF4" : "#475569" },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Divider */}
        <View
          style={[tw`mx-5 mb-7`, { height: 0.5, backgroundColor: "#E2E8F0" }]}
        />

        {/* ── Results ── */}
        <View style={tw`px-5 mb-5 gap-1`}>
          <View
            style={[tw`w-5 h-0.5 rounded-full`, { backgroundColor: "#F0B429" }]}
          />
          <Text style={[tw`text-sm font-medium`, { color: "#1a1a1a" }]}>
            {searchQuery.trim() !== ""
              ? "Search Results"
              : "Recent Submissions"}
          </Text>
          <View style={tw`flex-row items-center gap-1.5`}>
            <View
              style={[
                tw`w-1.5 h-1.5 rounded-full`,
                { backgroundColor: "#34D399" },
              ]}
            />
            <Text style={[tw`text-xs`, { color: "#94a3b8" }]}>
              {displayCollections.length} publikasi{" "}
              {searchQuery.trim() !== "" ? "ditemukan" : "terbaru"}
            </Text>
          </View>
        </View>

        {displayCollections.length === 0 ? (
          <EmptyState />
        ) : (
          <View style={tw`px-4 gap-2.5`}>
            {displayCollections.map((item) => (
              <CollectionCard
                key={item.id}
                item={item}
                onPress={() => handleItemPress(item)}
              />
            ))}

            {searchQuery.trim() === "" && (
              <TouchableOpacity
                onPress={handleLoadMore}
                activeOpacity={0.75}
                style={[
                  tw`flex-row items-center justify-center rounded-2xl py-3.5 mt-1 gap-2.5`,
                  {
                    backgroundColor: "#fff",
                    borderWidth: 0.5,
                    borderColor: "#047857",
                  },
                ]}
              >
                <View
                  style={[
                    tw`w-7 h-7 rounded-full items-center justify-center`,
                    { backgroundColor: "#ECFDF5" },
                  ]}
                >
                  <Ionicons name="add" size={14} color="#047857" />
                </View>
                <Text style={[tw`text-sm font-medium`, { color: "#047857" }]}>
                  Lihat Lebih Banyak
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Collection card ────────────────────────────────────────
function CollectionCard({
  item,
  onPress,
}: {
  item: Collection;
  onPress: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        tw`flex-row rounded-[18px] p-3.5`,
        {
          backgroundColor: pressed ? "#F8FAFC" : "#ffffff",
          borderWidth: 0.5,
          borderColor: pressed ? "#CBD5E1" : "#E8EDF3",
          gap: 14,
        },
      ]}
    >
      {/* Cover */}
      <View style={tw`relative`}>
        <View
          style={[
            tw`w-22 rounded-xl overflow-hidden`,
            { height: 124, borderWidth: 0.5, borderColor: "rgba(0,0,0,0.07)" },
          ]}
        >
          {item.image && !imgError ? (
            <Image
              source={item.image}
              style={tw`w-full h-full`}
              resizeMode="cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <PlaceholderCover />
          )}
        </View>

        {/* Item badge */}
        <View
          style={[
            tw`absolute -top-1.5 -left-1.5 px-1.5 py-0.5 rounded-md`,
            { backgroundColor: "#047857" },
          ]}
        >
          <Text style={[tw`text-[9px] font-semibold`, { color: "#D1FAE5" }]}>
            Item
          </Text>
        </View>

        {/* Year badge */}
        <View
          style={[
            tw`absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md`,
            { backgroundColor: "rgba(0,0,0,0.72)" },
          ]}
        >
          <Text style={[tw`text-[9px] font-semibold`, { color: "#fff" }]}>
            {item.year}
          </Text>
        </View>
      </View>

      {/* Body */}
      <View style={tw`flex-1 min-w-0 justify-between py-0.5`}>
        <View>
          <Text
            style={[
              tw`text-sm font-medium leading-5 mb-2.5`,
              { color: "#1a1a1a" },
            ]}
            numberOfLines={3}
          >
            {item.title}
          </Text>

          {/* Publisher */}
          <View style={tw`flex-row items-start gap-1.5 mb-1.5`}>
            <View
              style={[
                tw`w-5 h-5 rounded-md items-center justify-center`,
                { backgroundColor: "#EEE9FB" },
              ]}
            >
              <Ionicons name="business" size={11} color="#5A3CA8" />
            </View>
            <Text
              style={[tw`text-[11px] flex-1 leading-5`, { color: "#64748b" }]}
              numberOfLines={2}
            >
              {item.publisher}
            </Text>
          </View>

          {/* Author */}
          <View style={tw`flex-row items-start gap-1.5`}>
            <View
              style={[
                tw`w-5 h-5 rounded-md items-center justify-center`,
                { backgroundColor: "#EBF4FF" },
              ]}
            >
              <Ionicons name="person" size={11} color="#1D5FA3" />
            </View>
            <Text
              style={[tw`text-[11px] flex-1 leading-5`, { color: "#64748b" }]}
              numberOfLines={2}
            >
              {item.author}
            </Text>
          </View>
        </View>

        {/* Arrow */}
        <View style={tw`flex-row justify-end mt-2`}>
          <View
            style={[
              tw`w-8 h-8 rounded-[10px] items-center justify-center`,
              { backgroundColor: "#047857" },
            ]}
          >
            <Ionicons name="arrow-forward" size={14} color="#D1FAE5" />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function PlaceholderCover() {
  return (
    <View
      style={[
        tw`flex-1 items-center justify-center gap-1.5`,
        { backgroundColor: "#DDE6E1" },
      ]}
    >
      {[38, 28, 34].map((w, i) => (
        <View
          key={i}
          style={[
            tw`h-0.5 rounded-full`,
            { width: w, backgroundColor: "#B8CCBF" },
          ]}
        />
      ))}
    </View>
  );
}

function EmptyState() {
  return (
    <View
      style={[
        tw`mx-4 items-center py-14`,
        {
          backgroundColor: "#fff",
          borderWidth: 0.5,
          borderColor: "#E8EDF3",
          borderRadius: 18,
        },
      ]}
    >
      <View
        style={[
          tw`w-14 h-14 rounded-full items-center justify-center mb-3`,
          { backgroundColor: "#F1F5F9" },
        ]}
      >
        <Ionicons name="search-outline" size={24} color="#cbd5e1" />
      </View>
      <Text style={[tw`text-sm font-medium mb-1`, { color: "#1a1a1a" }]}>
        Tidak ada hasil ditemukan
      </Text>
      <Text style={[tw`text-xs`, { color: "#94a3b8" }]}>
        Coba kata kunci lain
      </Text>
    </View>
  );
}
