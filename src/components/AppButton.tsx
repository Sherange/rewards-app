import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
};

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  disabled = false,
  testID,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, disabled ? styles.buttonDisabled : null]}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      testID={testID}
    >
      <Text
        style={[styles.buttonText, disabled ? styles.buttonTextDisabled : null]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1064A3',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#f1f1f1',
  },
});

export default AppButton;
