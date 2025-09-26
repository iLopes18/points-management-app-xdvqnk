
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
          size={20}
          color={activeTab === 'categories' ? colors.backgroundAlt : colors.text}
        />
        <Text
          style={[
            commonStyles.tabText,
            activeTab === 'categories' && commonStyles.tabTextActive,
            { fontSize: 12 }
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
          size={20}
          color={activeTab === 'rewards' ? colors.backgroundAlt : colors.text}
        />
        <Text
          style={[
            commonStyles.tabText,
            activeTab === 'rewards' && commonStyles.tabTextActive,
            { fontSize: 12 }
          ]}
        >
          Rewards
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          commonStyles.tabButton,
          activeTab === 'history' && commonStyles.tabButtonActive,
        ]}
        onPress={() => onTabChange('history')}
      >
        <Icon
          name="clock"
          size={20}
          color={activeTab === 'history' ? colors.backgroundAlt : colors.text}
        />
        <Text
          style={[
            commonStyles.tabText,
            activeTab === 'history' && commonStyles.tabTextActive,
            { fontSize: 12 }
          ]}
        >
          History
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabs;
