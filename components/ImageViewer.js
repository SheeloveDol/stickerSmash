import { StyleSheet, Image } from "react-native";

export default function ImageViewer({ placehoderImageSource }) {
  return <Image source={placehoderImageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
