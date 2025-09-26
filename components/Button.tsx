
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Animated } from 'react-native';
import { colors } from '../styles/commonStyles';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'lara' | 'isaac' | 'redeem';
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  style,
  textStyle,
  disabled = false,
  variant = 'primary'
}) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getButtonStyle = () => {
    const baseStyle = styles.button;
    switch (variant) {
      case 'lara':
        return [baseStyle, { backgroundColor: colors.lara }];
      case 'isaac':
        return [baseStyle, { backgroundColor: colors.isaac }];
      case 'redeem':
        return [baseStyle, { backgroundColor: colors.redeem }];
      case 'secondary':
        return [baseStyle, styles.secondary];
      default:
        return [baseStyle, { backgroundColor: colors.primary }];
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[
          getButtonStyle(),
          style,
          disabled && styles.disabled,
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.text,
            variant === 'secondary' ? { color: colors.text } : { color: colors.backgroundAlt },
            textStyle,
            disabled && styles.disabledText,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
  },
  secondary: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.textSecondary,
  },
});

export default Button;
