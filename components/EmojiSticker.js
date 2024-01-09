import { View } from "react-native";
import { PanGestureHandler, TapGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function EmojiSticker({ imageSize, stickerSource }) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: (event, context) => {
      scaleImage.value = scaleImage.value === imageSize ? imageSize * 2 : imageSize;
    },
  });

  const onDrag = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      translateX.value = withSpring(translateX.value);
      translateY.value = withSpring(translateY.value);
    },
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={{ top: -350 }}>
      <PanGestureHandler minDist={10} onGestureEvent={onDrag}>
        <Animated.View style={{ flex: 1 }}>
          <TapGestureHandler numberOfTaps={2} onGestureEvent={onDoubleTap}>
            <Animated.Image
              source={stickerSource}
              resizeMode="contain"
              style={imageStyle}
            />
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}