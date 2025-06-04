import { StyleProp } from 'react-native'
import React, { useState } from 'react'
import { SvgUri } from 'react-native-svg'
import { Image, ImageContentFit, ImageStyle } from 'expo-image';

interface CustomImageProps {
  width: number
  height: number
  src: string
  contentFit?: ImageContentFit
  style?: StyleProp<ImageStyle>
  onLoad?: () => void
  fallback?: string
}

const CustomImage = ({
  width,
  height,
  src,
  style,
  contentFit = 'contain',
  onLoad,
  fallback
}: CustomImageProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [imgSource, setImageSource] = useState(src);

  if (!src || imageFailed) {
    return null
  }

  const onError = () => {
    if (fallback) {
      setImageSource(fallback)
    } else {
      setImageFailed(true);
    }
  }

  if (imgSource?.endsWith('.svg')) {
    return (
      <SvgUri
        uri={imgSource}
        width={width}
        height={height}
        onError={onError}
      />
    )
  }

  return (
    <Image
      source={imgSource}
      style={[{ width, height }, style]}
      contentFit={contentFit}
      onLoad={onLoad}
      onError={onError}
    />
  )
}

export default CustomImage