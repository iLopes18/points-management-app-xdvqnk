
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
  return (
    <View style={commonStyles.bottomTabs}>
      <TouchableOpacity
        style={[
          commonStyles.tabButton,
          activeTab === 'categories' && commonStyles.tabButtonActive,
        ]}
        onPress={() => onTabChange('categories')}
      >
        <Icon
          name="list"
          size={24}
          color={activeTab === 'categories' ? colors.backgroundAlt : colors.text}
        />
        <Text
          style={[
            commonStyles.tabText,
            activeTab === 'categories' && commonStyles.tabTextActive,
          ]}
        >
          Categories
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          commonStyles.tabButton,
          activeTab === 'rewards' && commonStyles.tabButtonActive,
        ]}
        onPress={() => onTabChange('rewards')}
      >
        <Icon
          name="gift"
          size={24}
          color={activeTab === 'rewards' ? colors.backgroundAlt : colors.text}
        />
        <Text
          style={[
            commonStyles.tabText,
            activeTab === 'rewards' && commonStyles.tabTextActive,
          ]}
        >
          Rewards
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabs;
