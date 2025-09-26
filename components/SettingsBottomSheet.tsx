
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import SimpleBottomSheet from './BottomSheet';

interface SettingsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const SettingsBottomSheet: React.FC<SettingsBottomSheetProps> = ({
  isVisible,
  onClose,
}) => {
  const { resetPoints } = useAppContext();

  const handleResetPoints = () => {
    Alert.alert(
      'Reset Points',
      'Are you sure you want to reset all points to zero? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetPoints();
            onClose();
            Alert.alert('Points Reset', 'All points have been reset to zero.');
          },
        },
      ]
    );
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.title, { marginBottom: 20 }]}>Settings</Text>
        
        <TouchableOpacity
          style={[buttonStyles.secondary, { marginBottom: 16 }]}
          onPress={handleResetPoints}
        >
          <Text style={[commonStyles.text, { color: colors.error, fontWeight: '600' }]}>
            Reset All Points
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={buttonStyles.primary}
          onPress={onClose}
        >
          <Text style={[commonStyles.text, { color: colors.backgroundAlt, fontWeight: '600' }]}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </SimpleBottomSheet>
  );
};

export default SettingsBottomSheet;
