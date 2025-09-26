
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import Icon from './Icon';
import SettingsBottomSheet from './SettingsBottomSheet';

const Header: React.FC = () => {
  const { totalPoints } = useAppContext();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <View style={commonStyles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text style={commonStyles.title}>Points Tracker</Text>
          <TouchableOpacity
            onPress={() => setShowSettings(true)}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: colors.background,
            }}
          >
            <Icon name="settings" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        
        <View style={commonStyles.pointsContainer}>
          <View style={commonStyles.pointsItem}>
            <Text style={[commonStyles.pointsLabel, { color: colors.primary }]}>
              Total Points
            </Text>
            <Text style={[commonStyles.pointsValue, { color: colors.primary }]}>
              {totalPoints}
            </Text>
          </View>
        </View>
      </View>
      
      <SettingsBottomSheet
        isVisible={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
};

export default Header;
