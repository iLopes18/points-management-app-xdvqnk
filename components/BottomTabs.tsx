
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { TabType } from '../types';
import Icon from './Icon';

interface BottomTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'categories', icon: 'list-outline', label: 'Categories' },
    { id: 'rewards', icon: 'gift-outline', label: 'Rewards' },
    { id: 'history', icon: 'time-outline', label: 'History' },
    { id: 'settings', icon: 'settings-outline', label: 'Settings' },
  ];

  return (
    <View style={commonStyles.bottomTabs}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            commonStyles.tabButton,
            activeTab === tab.id && commonStyles.tabButtonActive,
          ]}
          onPress={() => onTabChange(tab.id as TabType)}
        >
          <Icon
            name={tab.icon}
            size={20}
            color={activeTab === tab.id ? colors.backgroundAlt : colors.text}
          />
          <Text
            style={[
              commonStyles.tabText,
              activeTab === tab.id && commonStyles.tabTextActive,
              { fontSize: 12 }
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomTabs;
