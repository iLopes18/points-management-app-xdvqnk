
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import UserSettingsBottomSheet from './UserSettingsBottomSheet';
import CategorySettingsBottomSheet from './CategorySettingsBottomSheet';
import RewardSettingsBottomSheet from './RewardSettingsBottomSheet';
import { useAppContext } from '../context/AppContext';

type SettingsSection = 'users' | 'categories' | 'rewards' | null;

const SettingsView: React.FC = () => {
  const { resetPoints } = useAppContext();
  const [activeSection, setActiveSection] = useState<SettingsSection>(null);

  const settingsOptions = [
    {
      id: 'users',
      title: 'Edit Users',
      subtitle: 'Change names and colors',
      icon: 'person-outline',
      color: colors.primary,
    },
    {
      id: 'categories',
      title: 'Manage Categories & Tasks',
      subtitle: 'Add, edit, or delete categories and tasks',
      icon: 'list-outline',
      color: colors.secondary,
    },
    {
      id: 'rewards',
      title: 'Manage Rewards',
      subtitle: 'Add, edit, or delete rewards',
      icon: 'gift-outline',
      color: colors.accent,
    },
    {
      id: 'reset',
      title: 'Reset Points',
      subtitle: 'Clear all points and history',
      icon: 'refresh-outline',
      color: colors.error,
    },
  ];

  const handleOptionPress = (optionId: string) => {
    console.log(`Settings option pressed: ${optionId}`);
    
    if (optionId === 'reset') {
      handleResetPoints();
    } else {
      setActiveSection(optionId as SettingsSection);
    }
  };

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
            Alert.alert('Points Reset', 'All points have been reset to zero.');
          },
        },
      ]
    );
  };

  const closeBottomSheet = () => {
    setActiveSection(null);
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 20 }}>
          <Text style={[commonStyles.title, { marginBottom: 8, textAlign: 'left' }]}>
            Settings
          </Text>
          <Text style={[commonStyles.textSecondary, { marginBottom: 32, textAlign: 'left' }]}>
            Customize your points management app
          </Text>

          {settingsOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[commonStyles.card, { marginBottom: 16 }]}
              onPress={() => handleOptionPress(option.id)}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: option.color,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}
                >
                  <Icon name={option.icon} size={24} color={colors.backgroundAlt} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.subtitle, { marginBottom: 4 }]}>
                    {option.title}
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    {option.subtitle}
                  </Text>
                </View>
                <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <UserSettingsBottomSheet
        isVisible={activeSection === 'users'}
        onClose={closeBottomSheet}
      />

      <CategorySettingsBottomSheet
        isVisible={activeSection === 'categories'}
        onClose={closeBottomSheet}
      />

      <RewardSettingsBottomSheet
        isVisible={activeSection === 'rewards'}
        onClose={closeBottomSheet}
      />
    </View>
  );
};

export default SettingsView;
