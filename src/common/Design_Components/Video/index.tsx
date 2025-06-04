import { ResizeMode, Video, VideoProps } from "expo-av";
import { useEffect, useRef } from "react";

export interface VideoScreenProps extends Partial<VideoProps> {
  src: string;
  width?: number;
  height?: number;
  muted?: boolean;
  loop?: boolean;
  autoplay?: boolean;
}

const VideoScreen = (props: VideoScreenProps) => {
  const {
    src,
    width = 350,
    height = 275,
    muted = false,
    loop = false,
    autoplay = true,
    ...rest
  } = props;

  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (videoRef.current) {
      (async () => {
        if (autoplay) {
          await videoRef.current!.playAsync();
        } else if (videoRef.current) {
          await videoRef.current.pauseAsync();
        }
      })();
    }
  }, [autoplay]);

  return (
    <Video
      ref={videoRef}
      source={{ uri: src }}
      style={{ width, height }}
      isMuted={muted}
      isLooping={loop}
      shouldPlay={autoplay}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
      {...rest}
    />
  );
};

export default VideoScreen;
