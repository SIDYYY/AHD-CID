import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { supabase } from "../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function YoutubePlaylist() {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (!error) setVideos(data);
  };

  const openPlayer = (videoId) => {
    setCurrentVideo(videoId);
    setModalVisible(true);
    setPlaying(true);
  };

  const closePlayer = () => {
    setPlaying(false);
    setModalVisible(false);
    setCurrentVideo(null);
  };

  return (
    <View>
      {/* Horizontal Playlist */}
      <FlatList
        data={videos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openPlayer(item.video_id)}
            style={{
              width: width * 0.75,
              marginRight: 16,
              backgroundColor: "#f3f4f6",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Image
              source={{
                uri: `https://img.youtube.com/vi/${item.video_id}/hqdefault.jpg`,
              }}
              style={{
                width: "100%",
                height: (width * 0.75 * 9) / 16,
              }}
            />

            <View style={{ padding: 10 }}>
              <Text numberOfLines={2} style={{ fontWeight: "600" }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* 🎥 VIDEO MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closePlayer}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.95)",
            justifyContent: "center",
          }}
        >
          {/* Close Button */}
          <Pressable
            onPress={closePlayer}
            style={{
              position: "absolute",
              top: 50,
              right: 20,
              zIndex: 10,
            }}
          >
            <Ionicons name="close" size={32} color="white" />
          </Pressable>

          {/* Player */}
          {currentVideo && (
            <YoutubePlayer
              height={(width / 16) * 9}
              play={playing}
              videoId={currentVideo}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}