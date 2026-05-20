import { collections } from "@/data/collections";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function LengkapScreen() {
  const [showAbstract, setShowAbstract] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = collections.find((c) => c.id === Number(id));

  if (!item) {
    return (
      <SafeAreaView
        style={[
          tw`flex-1 justify-center items-center`,
          { backgroundColor: "#F4F6F3" },
        ]}
      >
        <View
          style={[
            tw`w-16 h-16 rounded-full items-center justify-center mb-3`,
            { backgroundColor: "#F1F5F9" },
          ]}
        >
          <Ionicons name="alert-circle-outline" size={32} color="#cbd5e1" />
        </View>
        <Text style={[tw`text-sm font-medium`, { color: "#1a1a1a" }]}>
          Data tidak ditemukan
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#047857" }]}>
      {/* ── Top bar ── */}
      <View style={[tw`flex-row items-center px-5 pt-2 pb-5`, { gap: 10 }]}>
        <Pressable
          onPress={() => router.back()}
          style={[
            tw`w-9 h-9 rounded-[10px] items-center justify-center`,
            {
              backgroundColor: "rgba(255,255,255,0.12)",
              borderWidth: 0.5,
              borderColor: "rgba(255,255,255,0.2)",
            },
          ]}
          hitSlop={8}
        >
          <Ionicons name="arrow-back" size={16} color="#F0FDF4" />
        </Pressable>
        <Text
          style={[tw`flex-1 text-sm font-medium`, { color: "#F0FDF4" }]}
          numberOfLines={1}
        >
          Detail Publikasi
        </Text>
      </View>

      {/* ── Cover hero ── */}
      <View
        style={[
          tw`items-center pb-8`,
          {
            backgroundColor: "#047857",
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          },
        ]}
      >
        <View
          style={{
            borderRadius: 16,
            overflow: "hidden",
            borderWidth: 0.5,
            borderColor: "rgba(0,0,0,0.1)",
          }}
        >
          {item.image ? (
            <Image
              source={item.image}
              style={{ width: 148, height: 200 }}
              resizeMode="cover"
            />
          ) : (
            <PlaceholderCover />
          )}
        </View>
      </View>

      {/* ── Scrollable body ── */}
      <ScrollView
        style={[tw`flex-1`, { backgroundColor: "#F4F6F3" }]}
        contentContainerStyle={tw`px-4 pt-5 pb-12`}
        showsVerticalScrollIndicator={false}
      >
        {/* Title card */}
        <View
          style={[
            tw`bg-white rounded-[18px] p-4 mb-3`,
            { borderWidth: 0.5, borderColor: "#E8EDF3" },
          ]}
        >
          <Text
            style={[
              tw`text-xl mb-2.5 leading-7`,
              { fontFamily: "serif", color: "#1a1a1a" },
            ]}
          >
            {item.title}
          </Text>
          <View
            style={[
              tw`self-start px-3 py-1 rounded-full`,
              {
                backgroundColor: "#ECFDF5",
                borderWidth: 0.5,
                borderColor: "#A7F3D0",
              },
            ]}
          >
            <Text style={[tw`text-xs font-medium`, { color: "#047857" }]}>
              {item.year}
            </Text>
          </View>
        </View>

        {/* Abstract card */}
        {item.abstract ? (
          <View
            style={[
              tw`bg-white rounded-[18px] p-4 mb-3`,
              { borderWidth: 0.5, borderColor: "#E8EDF3" },
            ]}
          >
            <SectionLabel title="Abstrak" />
            <Text
              style={[tw`text-xs leading-6`, { color: "#475569" }]}
              numberOfLines={showAbstract ? undefined : 4}
            >
              {item.abstract}
            </Text>
            {item.abstract.length > 200 && (
              <TouchableOpacity
                onPress={() => setShowAbstract(!showAbstract)}
                activeOpacity={0.7}
                style={tw`flex-row items-center mt-2.5 gap-1`}
              >
                <Text style={[tw`text-xs font-medium`, { color: "#047857" }]}>
                  {showAbstract ? "Sembunyikan" : "Baca Selengkapnya"}
                </Text>
                <Ionicons
                  name={showAbstract ? "chevron-up" : "chevron-down"}
                  size={13}
                  color="#047857"
                />
              </TouchableOpacity>
            )}
          </View>
        ) : null}

        {/* Info card */}
        <View
          style={[
            tw`bg-white rounded-[18px] p-4`,
            { borderWidth: 0.5, borderColor: "#E8EDF3" },
          ]}
        >
          <SectionLabel title="Informasi Publikasi" />

          <InfoRow
            icon="person-outline"
            iconBg="#EBF4FF"
            iconColor="#1D5FA3"
            label="Authors"
            value={item.author}
            accent
          />

          <Divider />

          <InfoRow
            icon="business-outline"
            iconBg="#EEE9FB"
            iconColor="#5A3CA8"
            label="Publisher"
            value={item.publisher}
          />

          <Divider />

          <InfoRow
            icon="folder-outline"
            iconBg="#ECFDF5"
            iconColor="#047857"
            label="Collection"
            value={item.koleksi}
            accent
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-components ─────────────────────────────────────────

function SectionLabel({ title }: { title: string }) {
  return (
    <View style={tw`gap-1 mb-3.5`}>
      <View
        style={[tw`w-5 h-0.5 rounded-full`, { backgroundColor: "#F0B429" }]}
      />
      <Text style={[tw`text-sm font-medium`, { color: "#1a1a1a" }]}>
        {title}
      </Text>
    </View>
  );
}

function InfoRow({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  accent = false,
}: {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <View style={tw`mb-3.5`}>
      <View style={tw`flex-row items-center gap-2 mb-1.5`}>
        <View
          style={[
            tw`w-7 h-7 rounded-lg items-center justify-center`,
            { backgroundColor: iconBg },
          ]}
        >
          <Ionicons name={icon as any} size={13} color={iconColor} />
        </View>
        <Text
          style={[
            tw`text-[10px] font-medium uppercase`,
            { color: "#94a3b8", letterSpacing: 1 },
          ]}
        >
          {label}
        </Text>
      </View>
      <Text
        style={[
          tw`text-sm leading-5 pl-9`,
          { color: accent ? "#047857" : "#1a1a1a" },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

function Divider() {
  return (
    <View style={[tw`mb-3.5`, { height: 0.5, backgroundColor: "#E8EDF3" }]} />
  );
}

function PlaceholderCover() {
  return (
    <View
      style={[
        { width: 148, height: 200, backgroundColor: "#DDE6E1" },
        tw`items-center justify-center gap-1.5`,
      ]}
    >
      {[52, 38, 46].map((w, i) => (
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
