import React, { useState } from 'react';
import { StyleProp } from 'react-native';
import FastImage, { FastImageProps, ImageStyle } from 'react-native-fast-image';

type AppImageProps = {
  uri?: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: FastImageProps['resizeMode'];
  placeholder?: number;
};

const AppImage: React.FC<AppImageProps> = ({
  uri,
  style,
  resizeMode = FastImage.resizeMode.cover,
  placeholder = require('../assets/placeholder.png'),
}) => {
  const [error, setError] = useState(false);

  return (
    <FastImage
      testID="FastImage"
      style={style}
      resizeMode={resizeMode}
      source={
        !error && uri
          ? { uri, priority: FastImage.priority.normal }
          : placeholder
      }
      onError={() => setError(true)}
    />
  );
};

export default AppImage;
